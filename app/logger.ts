import fs from 'fs'
import { LOG_FILE } from './consts'

export default class Logger {
  private logFile: fs.WriteStream

  constructor() {
    this.logFile = fs.createWriteStream(LOG_FILE, { flags: 'a' })
    this.addDateSeparator()
  }

  public logToFile = (message: string): void => {
    this.logFile.write(`${message}\n`)
  }

  private addDateSeparator = (): void => {
    this.logFile.write(`---------------------------\n`)
    this.logFile.write(`${new Date().toISOString()}\n`)
    this.logFile.write(`---------------------------\n`)
  }
}
