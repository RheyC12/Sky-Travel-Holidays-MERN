import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    List all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users });
});

// @desc    Promote/demote a user's role or (de)activate them
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { role, isActive } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (role) user.role = role;
  if (typeof isActive === "boolean") user.isActive = isActive;

  const updated = await user.save();
  res.json({ success: true, data: updated });
});
