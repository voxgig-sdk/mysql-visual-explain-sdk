
import { Context } from './Context'


class MysqlVisualExplainError extends Error {

  isMysqlVisualExplainError = true

  sdk = 'MysqlVisualExplain'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MysqlVisualExplainError
}

