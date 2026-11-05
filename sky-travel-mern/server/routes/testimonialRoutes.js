import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", protect, adminOnly, createTestimonial);
router.put("/:id", protect, adminOnly, updateTestimonial);
router.delete("/:id", protect, adminOnly, deleteTestimonial);

export default router;
