import { Context } from './Context';
declare class MysqlVisualExplainError extends Error {
    isMysqlVisualExplainError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MysqlVisualExplainError };
