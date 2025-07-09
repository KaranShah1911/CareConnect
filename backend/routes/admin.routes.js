import { Router } from "express";
import {
  addDoctor,
  handleAdminLogin,
} from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.js";
import { body } from "express-validator";
import { checkForAuthorization } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/add-doctor",
  checkForAuthorization(["ADMIN"]),
  upload.single("image"),
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  addDoctor
);

router.post("/login", handleAdminLogin);

export default router;
