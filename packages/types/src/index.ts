export type ApiError = {
  message: string;
  status?: number;
};

export { z } from "zod";
export type { ZodType, ZodSchema, infer as ZodInfer } from "zod";

export * from "./schemas/common";
export * from "./schemas/example";
