import express from "express";
import { body } from "express-validator";
import {
  createApplication,
  getMyApplications,
  getApplicationById,
  uploadDocuments,
  cancelApplication,
  getAllApplications,
  updateApplicationStatus,
  assignApplication,
  getApplicationStats,
} from "../controllers/visaController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Applicant routes
router.post(
  "/",
  protect,
  [
    body("country").notEmpty().withMessage("Destination country is required"),
    body("visaType").trim().notEmpty().withMessage("Visa type is required"),
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("passportNumber").trim().notEmpty().withMessage("Passport number is required"),
    body("passportExpiry").isISO8601().withMessage("Valid passport expiry date is required"),
    body("dateOfBirth").isISO8601().withMessage("Valid date of birth is required"),
    body("nationality").trim().notEmpty().withMessage("Nationality is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
  ],
  validate,
  createApplication
);

router.get("/mine", protect, getMyApplications);
router.put("/:id/cancel", protect, cancelApplication);
router.post("/:id/documents", protect, upload.array("documents", 6), uploadDocuments);

// Admin routes (declared before "/:id" would otherwise be fine since Express
// matches these exact-string routes first, but keep stats route explicit)
router.get("/stats/summary", protect, adminOnly, getApplicationStats);
router.get("/", protect, adminOnly, getAllApplications);
router.put("/:id/status", protect, adminOnly, updateApplicationStatus);
router.put("/:id/assign", protect, adminOnly, assignApplication);

// Shared (owner or admin) - keep after the more specific routes above
router.get("/:id", protect, getApplicationById);

export default router;
