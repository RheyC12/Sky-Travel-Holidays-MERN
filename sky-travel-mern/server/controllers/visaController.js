import asyncHandler from "express-async-handler";
import path from "path";
import VisaApplication from "../models/VisaApplication.js";
import Country from "../models/Country.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit a new visa application
// @route   POST /api/visa-applications
// @access  Private
export const createApplication = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.body.country);
  if (!country) {
    res.status(400);
    throw new Error("Selected destination country was not found");
  }

  const application = await VisaApplication.create({
    ...req.body,
    applicant: req.user._id,
    email: req.body.email || req.user.email,
    fee: country.baseFee,
    statusHistory: [
      { status: "submitted", note: "Application submitted by applicant", changedBy: req.user._id },
    ],
  });

  await sendEmail({
    to: application.email,
    subject: `Application received - ${application.referenceNumber}`,
    html: `<p>Hi ${application.fullName},</p><p>We've received your ${application.visaType} visa application for ${country.name}. Your reference number is <b>${application.referenceNumber}</b>. Our team will review it shortly.</p>`,
  });

  res.status(201).json({ success: true, data: application });
});

// @desc    Get logged-in user's own applications
// @route   GET /api/visa-applications/mine
// @access  Private
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await VisaApplication.find({ applicant: req.user._id })
    .populate("country", "name image slug")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: applications.length, data: applications });
});

// @desc    Get single application (owner or admin only)
// @route   GET /api/visa-applications/:id
// @access  Private
export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await VisaApplication.findById(req.params.id)
    .populate("country", "name image slug processingTimeDays")
    .populate("applicant", "name email phone")
    .populate("statusHistory.changedBy", "name role");

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  const isOwner = application.applicant._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to view this application");
  }

  res.json({ success: true, data: application });
});

// @desc    Upload one or more supporting documents to an application
// @route   POST /api/visa-applications/:id/documents
// @access  Private (owner only)
export const uploadDocuments = asyncHandler(async (req, res) => {
  const application = await VisaApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  if (application.applicant.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to modify this application");
  }

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("No files uploaded");
  }

  const newDocs = req.files.map((file) => ({
    label: req.body.label || file.fieldname,
    fileName: file.originalname,
    filePath: path.join("uploads", file.filename),
    mimeType: file.mimetype,
  }));

  application.documents.push(...newDocs);
  await application.save();

  res.status(201).json({ success: true, data: application.documents });
});

// @desc    Cancel own application (only while still submitted/under review)
// @route   PUT /api/visa-applications/:id/cancel
// @access  Private (owner only)
export const cancelApplication = asyncHandler(async (req, res) => {
  const application = await VisaApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }
  if (application.applicant.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to modify this application");
  }
  if (!["submitted", "under_review", "additional_docs_required"].includes(application.status)) {
    res.status(400);
    throw new Error(`Cannot cancel an application with status "${application.status}"`);
  }

  application.status = "cancelled";
  application.statusHistory.push({
    status: "cancelled",
    note: "Cancelled by applicant",
    changedBy: req.user._id,
  });
  await application.save();

  res.json({ success: true, data: application });
});

// ----------------- Admin -----------------

// @desc    Get all applications (filterable, paginated)
// @route   GET /api/visa-applications
// @access  Private/Admin
export const getAllApplications = asyncHandler(async (req, res) => {
  const { status, country, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (country) filter.country = country;
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { referenceNumber: { $regex: search, $options: "i" } },
      { passportNumber: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [applications, total] = await Promise.all([
    VisaApplication.find(filter)
      .populate("country", "name")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    VisaApplication.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: applications.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: applications,
  });
});

// @desc    Update application status (review workflow)
// @route   PUT /api/visa-applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  const validStatuses = [
    "submitted",
    "under_review",
    "additional_docs_required",
    "approved",
    "rejected",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const application = await VisaApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.status = status;
  if (note) application.adminNotes = note;
  application.statusHistory.push({ status, note, changedBy: req.user._id });
  await application.save();

  await sendEmail({
    to: application.email,
    subject: `Update on your application ${application.referenceNumber}`,
    html: `<p>Hi ${application.fullName},</p><p>Your visa application status has changed to <b>${status.replace(/_/g, " ")}</b>.${note ? `<br>Note from our team: ${note}` : ""}</p>`,
  });

  res.json({ success: true, data: application });
});

// @desc    Assign an application to an admin/staff member
// @route   PUT /api/visa-applications/:id/assign
// @access  Private/Admin
export const assignApplication = asyncHandler(async (req, res) => {
  const application = await VisaApplication.findByIdAndUpdate(
    req.params.id,
    { assignedTo: req.body.userId },
    { new: true }
  ).populate("assignedTo", "name email");

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  res.json({ success: true, data: application });
});

// @desc    Dashboard stats (counts by status, recent applications)
// @route   GET /api/visa-applications/stats/summary
// @access  Private/Admin
export const getApplicationStats = asyncHandler(async (req, res) => {
  const statusCounts = await VisaApplication.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const totalApplications = await VisaApplication.countDocuments();
  const recent = await VisaApplication.find()
    .populate("country", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: {
      total: totalApplications,
      byStatus: statusCounts.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
      recent,
    },
  });
});
