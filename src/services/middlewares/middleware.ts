import { Message } from "eris";

export type NextMiddleware = () => any;

export interface Middleware {
 handle(next: NextMiddleware, msg: Message, args: any[], command: string): Promise<any>
}