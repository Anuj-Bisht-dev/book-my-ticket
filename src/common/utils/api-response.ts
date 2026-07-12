import { Response } from "express";

export class ApiResponse {
  static ok(res: Response, message: string = "ok", data: object | null = null) {
    return res.status(200).json({
      message,
      data,
    });
  }

  static created(
    res: Response,
    message: string = "successfuly created",
    data: object | null = null
  ) {
    return res.status(201).json({
      message,
      data,
    });
  }
}
