import { Context } from './Context';
declare class JsonplaceholderError extends Error {
    isJsonplaceholderError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { JsonplaceholderError };
