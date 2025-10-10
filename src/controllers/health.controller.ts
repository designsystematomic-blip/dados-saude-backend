import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus";

export class HealthController {
  static async check(req: Request, res: Response) {
    res.json({
      info: "Service Dados Saúde",
      message: "API is healthy",
      status: httpStatus.OK,
    });
  }
}
