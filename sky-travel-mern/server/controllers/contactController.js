import asyncHandler from "express-async-handler";
import ContactMessage from "../models/ContactMessage.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit the public contact form
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);

  await sendEmail({
    to: process.env.SMTP_FROM || "info@skytravelholidaysfz.com",
    subject: `New contact form submission: ${message.subject || "General inquiry"}`,
    html: `<p>From: ${message.name} (${message.email})</p><p>${message.message}</p>`,
  });

  res.status(201).json({ success: true, data: message });
});

// @desc    List contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

// @desc    Update a message's status (new/read/responded)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json({ success: true, data: message });
});
