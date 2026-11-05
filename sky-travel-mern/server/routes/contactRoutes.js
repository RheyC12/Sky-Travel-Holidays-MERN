import express from "express";
import { body } from "express-validator";
import {
  submitContactMessage,
  getContactMessages,
  updateContactMessage,
} from "../controllers/contactController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validate,
  submitContactMessage
);

router.get("/", protect, adminOnly, getContactMessages);
router.put("/:id", protect, adminOnly, updateContactMessage);

export default router;
