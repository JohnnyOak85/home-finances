import { NextFunction, Request, Response, Router } from "express";

import HttpStatusCodes from "@/HttpStatusCodes";
import { getEarliestRecord } from "@/handlers/records";

const { OK } = HttpStatusCodes;
const router = Router();
const path = "/records";

type RecordResponse = Response<ExpenseRecord>;

router.get(
  `${path}/earliest`,
  async (_: Request, res: RecordResponse, next: NextFunction) => {
    try {
      res.status(OK).send(getEarliestRecord());
    } catch (error) {
      next(error);
    }
  }
);

export default router;
