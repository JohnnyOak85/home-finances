import { NextFunction, Request, Response, Router } from "express";

import { getExpenses, updateExpenses } from "@/handlers/expenses";
import HttpStatusCodes from "@/HttpStatusCodes";

const { OK, NO_CONTENT } = HttpStatusCodes;
const router = Router();
const path = "/expenses";

type ExpenseRequest = Request<
  object,
  ExpensePayload,
  ExpenseBody,
  ExpenseQuery
>;
type ExpenseResponse = Response<ExpensePayload>;

router.get(
  path,
  async (req: ExpenseRequest, res: ExpenseResponse, next: NextFunction) => {
    try {
      res.status(OK).send(getExpenses(req.query.date));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  path,
  async (req: ExpenseRequest, res: ExpenseResponse, next: NextFunction) => {
    try {
      updateExpenses(req.body, req.query.date);

      res.status(NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
