import { Context } from '../types'

import chalk from 'chalk'
import { NextFunction, Request, Response } from 'express'
import * as crypto from 'crypto'

function formatTime (ms: number) {
  if (ms < 1000) {
    return `${ms}ms`
  } else {
    return `${(ms / 1000).toFixed(3)}s`
  }
}

export default function requestLogger (ctx: Context) {
  return (req: Request, res: Response, next: NextFunction) => {
    const t0 = Date.now()
    const reqId = crypto.randomBytes(3).toString('hex')

    ctx.logger.trace('API', `${chalk.gray(reqId)} ${chalk.blue(req.ip)} -> ${chalk.cyan(req.method)} ${chalk.green(req.path)}`)

    next()

    res.on('close', () => {
      const t1 = Date.now() - t0

      ctx.logger.trace('API', `${chalk.gray(reqId)} ${chalk.blue(req.ip)} <- ${chalk.cyan(req.method)} ${chalk.green(req.path)} - ${chalk.red(res.statusCode)} ${chalk.yellow(formatTime(t1))}`)
    })
  }
}
