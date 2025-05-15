import { Request } from "express";

export interface AuthRequest<
    P = any, // params
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user? : any
}