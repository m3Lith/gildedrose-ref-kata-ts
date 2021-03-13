import ApiClient from './apiClient'
import { SpecialItemTypes } from './consts'
import GildedRose from './gilded-rose'
import Item from './item'
import Logger from './logger'

const setupGildedRose = () => {
  const normalItem = new Item('normalItem', 10, 10)
  const sulfuras = new Item(SpecialItemTypes.Sulfuras, 10, 10)

  return new GildedRose([normalItem, sulfuras])
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

  const logger = new Logger()
  const apiClient = new ApiClient(logger)
  const shop = setupGildedRose()

  for (let i = 0; i < updateCount; i++) {
    // eslint-disable-next-line no-await-in-loop
    await apiClient.makeRequests(requestCount, i + 1)
    logger.logToFile('- Items updated -')
    shop.updateQuality()
  }
}

execute()
