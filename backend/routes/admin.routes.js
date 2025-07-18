import { Router } from "express";
import {
  addDoctor,
  handleAdminLogin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashBoard,
} from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.js";
import { body } from "express-validator";
import { checkForAuthorization, verifyJWT } from "../middlewares/auth.middleware.js";
import { changeAvailibility } from "../controllers/doctor.controllers.js";

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
router.get("/all-doctors", checkForAuthorization(["ADMIN"]), allDoctors);
router.post(
  "/change-availibility",
  checkForAuthorization(["ADMIN"]),
  changeAvailibility
);

router.get('/appointments', checkForAuthorization(["ADMIN"]), appointmentsAdmin)
router.post('/cancel-appointment', checkForAuthorization(["ADMIN"]), appointmentCancel)
router.get('/dashboard', checkForAuthorization(["ADMIN"]), verifyJWT, adminDashBoard)
export default router;
