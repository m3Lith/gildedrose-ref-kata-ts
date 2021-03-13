import got from 'got'
import fs from 'fs'
import { LOG_FILE, SpecialItemTypes } from './consts'
import GildedRose from './gilded-rose'
import Item from './item'

let logFile: fs.WriteStream

const logToFile = (message: string): void => {
  logFile.write(`${message}\n`)
}

const initLogFile = (): void => {
  logFile = fs.createWriteStream(LOG_FILE, { flags: 'a' })
  logFile.write(`---------------------------\n`)
  logFile.write(`${new Date().toISOString()}\n`)
  logFile.write(`---------------------------\n`)
}

const setupGildedRose = () => {
  const normalItem = new Item('normalItem', 10, 10)
  const sulfuras = new Item(SpecialItemTypes.Sulfuras, 10, 10)

  return new GildedRose([normalItem, sulfuras])
}

// eslint-disable-next-line consistent-return
const callApi = async () => {
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

const makeRequests = async (requestCount: number, iteration: number, repeats = 0) => {
  const promises: Promise<boolean | undefined>[] = []

  for (let i = 0; i < requestCount; i++) {
    promises.push(callApi())
  }
  const answers: (boolean | undefined)[] = await Promise.all(promises)
  const positives: (boolean | undefined)[] = answers?.filter((answer) => answer === true)

  // Should only log the original call?
  const logEntry = `PRE UPDATE #${iteration}, re#${repeats}: yes x ${positives.length}`
  logToFile(logEntry)

  if (positives.length > 0) {
    await makeRequests(positives.length, iteration, repeats + 1)
  }
}

const execute = async () => {
  if (process.argv.length !== 4) {
    throw new Error('Expected two arguments')
  }
  const updateCount = Number(process.argv.slice(2)[0])
  const requestCount = Number(process.argv.slice(2)[1])
  if (!Number.isInteger(updateCount) || !Number.isInteger(requestCount)) {
    throw new Error('Both arguments must be integers')
  }

  initLogFile()

  const shop = setupGildedRose()

  for (let i = 0; i < updateCount; i++) {
    // eslint-disable-next-line no-await-in-loop
    await makeRequests(requestCount, i + 1)
    logToFile('- Items updated -')
    shop.updateQuality()
  }
}

execute()
