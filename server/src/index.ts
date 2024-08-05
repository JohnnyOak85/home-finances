import express from "express";
import routers from "@/routes";
import errorHandler from "@/middleware/errorHandler";

const port = 3030;

const start = () => {
  try {
    const app = express();

    app.use(express.json());

    routers.forEach((router) => {
      app.use(router);
    });

    app.use(errorHandler);

    return app.listen(port, () => {
      console.log(`API is awaiting requests on port ${port}.`);
    });
  } catch (error) {
    throw error;
  }
};

start();
