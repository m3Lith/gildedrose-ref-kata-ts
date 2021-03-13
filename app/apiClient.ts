import got from 'got'
import Logger from './logger'

export default class ApiClient {
  private logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  public makeRequests = async (requestCount: number, iteration: number, repeats = 0): Promise<void> => {
    const promises: Promise<boolean | undefined>[] = []

    for (let i = 0; i < requestCount; i++) {
      promises.push(this.callApi())
    }
    const answers: (boolean | undefined)[] = await Promise.all(promises)
    const positives: (boolean | undefined)[] = answers?.filter((answer) => answer === true)

    // Should only log the original call?
    const logEntry = `PRE UPDATE #${iteration}, re#${repeats}: yes x ${positives.length}`
    this.logger.logToFile(logEntry)

    if (positives.length > 0) {
      await this.makeRequests(positives.length, iteration, repeats + 1)
    }
  }

  // eslint-disable-next-line consistent-return
  private callApi = async () => {
    let isPositive = false
    try {
      const response = await got('https://yesno.wtf/api')
      const { answer } = JSON.parse(response.body)
      isPositive = answer === 'yes'

      return isPositive
    } catch (error) {
      console.error(error.response.body)
    }
  }
}
