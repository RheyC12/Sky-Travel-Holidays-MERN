import asyncHandler from "express-async-handler";
import Country from "../models/Country.js";

// @desc    List all active countries (with optional search & region filter)
// @route   GET /api/countries
// @access  Public
export const getCountries = asyncHandler(async (req, res) => {
  const { search, region } = req.query;
  const filter = { isActive: true };

  if (region) filter.region = region;
  if (search) filter.name = { $regex: search, $options: "i" };

  const countries = await Country.find(filter).sort({ name: 1 });
  res.json({ success: true, count: countries.length, data: countries });
});

// @desc    Get a single country by slug
// @route   GET /api/countries/:slug
// @access  Public
export const getCountryBySlug = asyncHandler(async (req, res) => {
  const country = await Country.findOne({ slug: req.params.slug, isActive: true });
  if (!country) {
    res.status(404);
    throw new Error("Country not found");
  }
  res.json({ success: true, data: country });
});

// @desc    Create a country
// @route   POST /api/countries
// @access  Private/Admin
export const createCountry = asyncHandler(async (req, res) => {
  const country = await Country.create(req.body);
  res.status(201).json({ success: true, data: country });
});

// @desc    Update a country
// @route   PUT /api/countries/:id
// @access  Private/Admin
export const updateCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!country) {
    res.status(404);
    throw new Error("Country not found");
  }
  res.json({ success: true, data: country });
});

// @desc    Delete (deactivate) a country
// @route   DELETE /api/countries/:id
// @access  Private/Admin
export const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!country) {
    res.status(404);
    throw new Error("Country not found");
  }
  res.json({ success: true, message: "Country deactivated" });
});
