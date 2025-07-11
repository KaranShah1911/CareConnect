import jwt from "jsonwebtoken";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

// to simply check if user has valid token or not
const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) throw new ApiError(401, "Unauthorized");

    const userData = jwt.verify(token, process.env.JWT_SECRET);

    if (!userData) throw new ApiError(401, "Token Expired or Invalid");

    req.userId = userData.id;
    if (req.body) req.body.userId = userData.id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(401).json(new ApiResponse(401, "Token Expired"));

    return res
      .status(401)
      .json(new ApiResponse(error.statusCode || 401, error.message));
  }
};

// to check if user is admin or not simply call checkForAuthorization(["USER_TYPE"]) as middleware
const checkForAuthorization = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

      if (!token) throw new ApiError(401, "Unauthorized");

      const userData = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(userData.role)) {
        throw new ApiError(401, `You are not Authorized`);
      }
      next();
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  };
};

export { verifyJWT, checkForAuthorization };
