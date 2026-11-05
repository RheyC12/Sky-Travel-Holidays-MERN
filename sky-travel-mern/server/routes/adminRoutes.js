import express from "express";
import { getUsers, updateUser } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", getUsers);
router.put("/users/:id", updateUser);

export default router;
