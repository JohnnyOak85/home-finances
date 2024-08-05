import { NextFunction, Request, Response, Router } from "express";

import HttpStatusCodes from "@/HttpStatusCodes";
import { getContributors, updateContributor } from "@/handlers/contributors";

const { OK, NO_CONTENT } = HttpStatusCodes;
const router = Router();
const path = "/contributors";

type ContributorRequest = Request<object, ContributorPayload, ContributorBody>;
type ContributorResponse = Response<ContributorPayload>;

router.get(
  path,
  async (
    _: ContributorRequest,
    res: ContributorResponse,
    next: NextFunction
  ) => {
    try {
      res.status(OK).send(getContributors());
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  path,
  async (
    req: ContributorRequest,
    res: ContributorResponse,
    next: NextFunction
  ) => {
    try {
      updateContributor(req.body);

      res.status(NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
