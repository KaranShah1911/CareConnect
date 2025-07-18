import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/google-redirect?success=false",
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, role: "USER" },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true
    });
    res.redirect(`http://localhost:5173/google-redirect?success=true&image=${user.image}`); // Your frontend redirect
  }
);

export default router;
