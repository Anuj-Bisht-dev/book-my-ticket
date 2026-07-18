import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "../dto/base.dto.js";
import { ApiError } from "../utils/api-error.js";

export const validateDto = (DtoClass: ValidationResult<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { errors, value } = DtoClass;
    if (errors) {
      throw ApiError.badRequest(errors.join(";"));
      next();
    }
    req.body = value;
    next();
  };
};
