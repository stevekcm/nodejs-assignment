import { Request, Response, NextFunction } from "express";
import os from "os";
import multer from "multer";
import salesController from "../controllers/salesController";
import { body } from "express-validator";
import validator from "../middleware/validator";
import { createClient } from "redis";
import { RedisClientType } from "@node-redis/client";

// use temporary folder for CSV
const upload = multer({ dest: os.tmpdir() });
let client: RedisClientType;

if (process.env.REDIS_URL) {
  client = createClient({
    url: process.env.REDIS_URL,
  });
} else {
  client = createClient();
}

const rules = {
  from: body("from").isDate().withMessage("Invalid From Date"),
  to: body("to")
    .isDate()
    .optional({ nullable: true, checkFalsy: true })
    .withMessage("Invalid To Date"),
};

const record = [
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;

      if (!file)
        return res.status(400).json({
          status: 400,
          errors: "No file found",
        });

      if (file.mimetype !== "text/csv")
        return res
          .status(400)
          .json({ status: 400, errors: "Invalid file type" });

      const stream = await salesController.createStream(file);

      const sales = await salesController.readStream(stream);

      await salesController.create(sales);

      return res.status(200).end("CSV Data Inserted");
    } catch (err) {
      next(err);
    }
  },
];

const report = [
  rules.from,
  rules.to,
  validator.validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await client.connect();

      const fromDate = req.body.from;
      const toDate = req.body.to
        ? req.body.to
        : new Date().setHours(0, 0, 0, 0);
      const filterKey = `${fromDate + toDate}`;
      let report;

      if (!(await client.get(filterKey))) {
        report = await salesController.find(fromDate, toDate);

        await client.set(filterKey, JSON.stringify(report), { EX: 300 });
        await client.quit();
        return res.status(200).send(report);
      } else {
        report = await client.get(filterKey);
        await client.quit();
        return res.status(200).send(JSON.parse(report));
      }
    } catch (err) {
      next(err);
    }
  },
];

export default {
  record,
  report,
};
