
import { Context } from './Context'


class JsonplaceholderError extends Error {

  isJsonplaceholderError = true

  sdk = 'Jsonplaceholder'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  JsonplaceholderError
}

