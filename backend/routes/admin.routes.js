import { Router } from "express";
import {
  addDoctor,
  handleAdminLogin,
  allDoctors,
} from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.js";
import { body } from "express-validator";
import { checkForAuthorization } from "../middlewares/auth.middleware.js";
import { changeAvailibility } from "../controllers/doctor.controllers.js"

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
router.post("/all-doctors", checkForAuthorization(["ADMIN"]), allDoctors);
router.post("/change-availibility", checkForAuthorization(["ADMIN"]), changeAvailibility);

export default router;
