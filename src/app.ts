import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import ApplicationError from "./errors/application-error";
import routes from "./routes";
import logger from "./logger";
const cors = require("cors");

const app = express();

app.use(cors());
/*
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/
function logResponseTime(req: Request, res: Response, next: NextFunction) {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
    logger.log({
      level: "info",
      message,
      consoleLoggerOptions: { label: "API" },
    });
  });

  next();
}

app.use(logResponseTime);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use(routes);

app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).json({
      error: process.env.NODE_ENV === "development" ? err : undefined,
      message: err.message,
    });
  }
);

export default app;
