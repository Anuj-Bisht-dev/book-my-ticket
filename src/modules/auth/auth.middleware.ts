import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/tokens.utils.js";
import { JwtPayload } from "jsonwebtoken";

// adding own methods user in request method [express's @type]
interface UserRequest extends Request {
  user?: JwtPayload | null;
}
// extends request means "take everything from request already has plus, add new user field"

// non restricted function applied on all routes
export function authenticationAddAccessToken() {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.cookies?.accessToken || req.headers?.authorization;

    if (!authHeader) return next();

    let accessToken;
    if (req.cookies?.accessToken) {
      accessToken = authHeader;
    } else if (req.headers?.authorization) {
      if (!authHeader?.startsWith("bearer"))
        throw ApiError.unauthorize(
          "authorization token must starts with bearer"
        );
      accessToken = authHeader.split(" ")[1];

      if (!accessToken)
        throw ApiError.unauthorize(
          "authorization token must starts with bearer and followed by token value"
        );
    }

    const users = verifyAccessToken(accessToken);
    req.user = users;
    next();
  };
}

// for authenticated routes [caution: restriction can occure if route not authenticated]
export function authentication() {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw ApiError.unauthorize("request must be authenticated");
    next();
  };
}
