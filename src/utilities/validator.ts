import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validator =
    <T extends ZodRawShape>(source: "body" | "params" | "query", schema: ZodObject<T>, passthrough: boolean = false) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                if (passthrough) {
                    req[source] = schema.passthrough().parse(req[source]);
                } else {
                    req[source] = schema.parse(req[source]);
                }
                next();
            } catch (e: any) {
                next({ statusCode: 400, message: e.issues});
            }
        };