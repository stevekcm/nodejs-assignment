import mongoose from "mongoose";

export interface SalesDoc extends SalesRecord, mongoose.Document {}

export type SalesModel = mongoose.Model<SalesDoc>;

export type SalesDocLean = mongoose.LeanDocument<SalesDoc>;

export interface SalesRecord {
  USER_NAME: string;
  AGE: number;
  HEIGHT: number;
  GENDER: string;
  SALE_AMOUNT: number;
  LAST_PURCHASE_DATE: Date;
}

const salesSchema = new mongoose.Schema({
  USER_NAME: {
    type: String,
    required: true,
  },
  AGE: {
    type: Number,
    min: 1,
    max: 120,
    required: true,
  },
  HEIGHT: {
    type: Number,
    min: 100,
    max: 250,
    required: true,
  },
  GENDER: {
    type: String,
    required: true,
  },
  SALE_AMOUNT: {
    type: Number,
    required: true,
  },
  LAST_PURCHASE_DATE: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<SalesDoc, SalesModel>("Sales", salesSchema);
