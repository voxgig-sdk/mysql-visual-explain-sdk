"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlVisualExplainError = void 0;
class MysqlVisualExplainError extends Error {
    isMysqlVisualExplainError = true;
    sdk = 'MysqlVisualExplain';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MysqlVisualExplainError = MysqlVisualExplainError;
//# sourceMappingURL=MysqlVisualExplainError.js.map