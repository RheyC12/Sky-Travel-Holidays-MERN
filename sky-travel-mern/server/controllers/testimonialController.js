import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial.js";

// @desc    List published testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }
  res.json({ success: true, data: testimonial });
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }
  res.json({ success: true, message: "Testimonial removed" });
});
