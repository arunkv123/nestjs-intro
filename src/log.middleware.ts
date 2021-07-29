import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, path: url } = req;
        console.log(req.url);
        res.on('finish', () => {
            console.log(res.get('content-type'));
        });
        next();
    }
    
}