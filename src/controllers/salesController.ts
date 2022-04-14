import Sales, { SalesRecord } from "./../models/sales";
import fs from "fs";
import { parse } from "csv-parse";

const readStream = (stream: fs.ReadStream): Promise<SalesRecord[]> => {
  return new Promise((resolve, reject) => {
    let salesArray: SalesRecord[] = [];
    let index = 1;

    stream
      .pipe(parse({ delimiter: "," }))
      .on("data", (row: any) => {
        if (row.length !== 6) {
          reject(
            new Error(
              `Invalid row on line ${index}, expected 6 elements but got ${row.length}`
            )
          );
        }

        const userName: string = row[0];
        const age: number = parseInt(row[1]);
        const height: number = parseInt(row[2]);
        const gender: string = row[3].toUpperCase();
        const saleAmount: number = parseInt(row[4]);
        const lastPurchaseDate: Date = new Date(row[5]);

        if (!userName) reject(new Error(`Invalid username on line ${index}`));
        if (!age) reject(new Error(`Invalid age on line ${index}`));
        if (!height) reject(new Error(`Invalid height on line ${index}`));
        if (gender !== "M" && gender !== "F")
          reject(new Error(`Invalid gender on line ${index}`));
        if (!saleAmount)
          reject(new Error(`Invalid sale amount on line ${index}`));
        if (isNaN(lastPurchaseDate.getTime()))
          reject(new Error(`Invalid last purchase date on line ${index}`));

        const sales: SalesRecord = {
          USER_NAME: userName,
          AGE: age,
          HEIGHT: height,
          GENDER: gender,
          SALE_AMOUNT: saleAmount,
          LAST_PURCHASE_DATE: lastPurchaseDate,
        };

        salesArray.push(sales);
        index++;
      })
      .on("error", (err) => {
        reject(err);
      });

    stream.on("end", () => {
      stream.close();
      resolve(salesArray);
    });
  });
};

const createStream = async (file: Express.Multer.File) => {
  return fs.createReadStream(file.path);
};

const create = async (sales: SalesRecord[]) => {
  await Sales.insertMany(sales);
};

const find = async (from: Date, to: Date) => {
  return await Sales.find({
    LAST_PURCHASE_DATE: {
      $gte: from,
      $lt: to,
    },
  })
    .select("USER_NAME AGE HEIGHT GENDER SALE_AMOUNT LAST_PURCHASE_DATE")
    .lean();
};

export default {
  process,
  find,
  readStream,
  createStream,
  create,
};
