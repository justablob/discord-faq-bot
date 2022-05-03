import { Config } from './config'

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

type LogLevelNames = Exclude<keyof typeof Level, number>
type LogFunction = (component: string, ...args: any[]) => void

const levelStrings = {
  [Level.critical]: chalk.bold.bgRed(' CRIT ') + ' ',
  [Level.error]: chalk.bgRed(' ERROR '),
  [Level.warning]: chalk.bgYellow(' WARN ') + ' ',
  [Level.info]: chalk.bgGreen(' INFO ') + ' ',
  [Level.debug]: chalk.bgCyan(' DEBUG '),
  [Level.trace]: chalk.bgBlue(' TRACE ')
}

function writeMessage (level: string, component: string, ...args: any[]) {
  const formattedComponent = component ? ` ${chalk.bold(component)} ${chalk.gray('-')}` : ''
  console.log(`${level} ${chalk.gray(dayjs().format('YYYY-MM-DD HH:mm:ssZ'))}${formattedComponent}`, ...args)
}

export default function logger (config: Config) {
  const functions: any = {}

  for (let k of Object.keys(Level).filter(el => isNaN(Number(el)))) {
    functions[k] = (component, ...args) => {
      if (Level[config.LOG_LEVEL] < Level[k]) return

      writeMessage(levelStrings[Level[k]], component, ...args)
    }
  }

  return functions as { [x in LogLevelNames]: LogFunction }
}

export type Logger = ReturnType<typeof logger>
