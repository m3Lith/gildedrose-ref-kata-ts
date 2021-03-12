import got from 'got'
import { SpecialItemTypes } from './consts'
import GildedRose from './gilded-rose'
import Item from './item'

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

  process.argv.slice(2).forEach((val, index, array) => {
    console.log(`${index}: ${val}`)
  })

  const shop = setupGildedRose()

  try {
    const response = await got('https://yesno.wtf/api')
    console.log(response.body)
  } catch (error) {
    console.error(error.response.body)
  }
}

execute()
