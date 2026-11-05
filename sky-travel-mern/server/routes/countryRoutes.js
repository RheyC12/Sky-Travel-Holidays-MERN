import express from "express";
import {
  getCountries,
  getCountryBySlug,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/countryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCountries);
router.get("/:slug", getCountryBySlug);
router.post("/", protect, adminOnly, createCountry);
router.put("/:id", protect, adminOnly, updateCountry);
router.delete("/:id", protect, adminOnly, deleteCountry);

export default router;
