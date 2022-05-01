import { Context } from '../types'

import chalk from 'chalk/source'
import dayjs from 'dayjs'

enum Level {
  critical = 0,
  error = 1,
  warning = 2,
  info = 3,
  debug = 4,
  trace = 5
}

const levelStrings = {
  [Level.critical]: ' CRIT ',
  [Level.error]: ' ERROR ',
  [Level.warning]: ' WARN ',
  [Level.info]: ' INFO ',
  [Level.debug]: ' DEBUG ',
  [Level.trace]: ' TRACE '
}

class InternalLogger {
  constructor (private level: string) {}

  critical (component: string, ...args: any[]) {
    if (Level[this.level] < Level.critical) return

    InternalLogger.writeMessage(chalk.bold.bgRed(levelStrings[Level.critical]), component, ...args)
  }

  error (component: string, ...args: any[]) {
    if (Level[this.level] < Level.error) return

    InternalLogger.writeMessage(chalk.bgRed(levelStrings[Level.error]), component, ...args)
  }

  warning (component: string, ...args: any[]) {
    if (Level[this.level] < Level.warning) return

    InternalLogger.writeMessage(chalk.bgYellow(levelStrings[Level.warning]), component, ...args)
  }

  info (component: string, ...args: any[]) {
    if (Level[this.level] < Level.info) return

    InternalLogger.writeMessage(chalk.bgGreen(levelStrings[Level.info]), component, ...args)
  }

  debug (component: string, ...args: any[]) {
    if (Level[this.level] < Level.debug) return

    InternalLogger.writeMessage(chalk.bgCyan(levelStrings[Level.debug]), component, ...args)
  }

  trace (component: string, ...args: any[]) {
    if (Level[this.level] < Level.trace) return

    InternalLogger.writeMessage(chalk.bgBlue(levelStrings[Level.trace]), component, ...args)
  }

  static writeMessage (level: string, component: string, ...args: any[]) {
    console.log(`${chalk.gray(dayjs().format('YYYY-MM-DD HH:mm:ssZ'))} ${level} ${chalk.bold(component)} ${chalk.gray('-')}`, ...args)
  }
}

export default function initLogger (ctx: Context) {
  return new InternalLogger(ctx.config.LOG_LEVEL)
}

export type Logger = ReturnType<typeof initLogger>
