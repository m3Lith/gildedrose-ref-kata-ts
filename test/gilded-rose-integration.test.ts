import { SpecialItemTypes } from '../app/consts'
import GildedRose from '../app/gilded-rose'
import Item from '../app/item'

describe('Gilded Rose', () => {
  let shop: GildedRose

  const normalItemSellIn = 3
  const agedBrieSellIn = 11
  const bkstPassSellIn = 11
  const sulfurasSellIn = 11
  const conjuredSellIn = 3

  const normalItemQuality = 10
  const agedBrieQuality = 10
  const bkstPassQuality = 10
  const sulfurasQuality = 80
  const conjuredQuality = 15

  test('Item creation', () => {
    const normalItem = new Item('normalItem', normalItemSellIn, normalItemQuality)
    const normalExpiresIn1 = new Item('normalExpiresIn1', 1, normalItemQuality)
    const normalExpiresIn0 = new Item('normalExpiresIn0', 0, normalItemQuality)
    const agedBrie = new Item(SpecialItemTypes.AgedBrie, agedBrieSellIn, agedBrieQuality)
    const bkstPass = new Item(SpecialItemTypes.BackStagePasses, bkstPassSellIn, bkstPassQuality)
    const sulfuras = new Item(SpecialItemTypes.Sulfuras, sulfurasSellIn, sulfurasQuality)
    const conjured = new Item(SpecialItemTypes.Conjured, conjuredSellIn, conjuredQuality)
    shop = new GildedRose([normalItem, agedBrie, bkstPass, sulfuras, conjured, normalExpiresIn1, normalExpiresIn0])
    const items = shop.getItems()

    expect(items.length).toBe(7)

    expect(items[0].name).toEqual('normalItem')
    expect(items[0].sellIn).toEqual(normalItemSellIn)
    expect(items[0].quality).toEqual(normalItemQuality)

    expect(items[1].name).toEqual(SpecialItemTypes.AgedBrie)
    expect(items[1].sellIn).toEqual(agedBrieSellIn)
    expect(items[1].quality).toEqual(agedBrieQuality)

    expect(items[2].name).toEqual(SpecialItemTypes.BackStagePasses)
    expect(items[2].sellIn).toEqual(bkstPassSellIn)
    expect(items[2].quality).toEqual(bkstPassQuality)

    expect(items[3].name).toEqual(SpecialItemTypes.Sulfuras)
    expect(items[3].sellIn).toEqual(sulfurasSellIn)
    expect(items[3].quality).toEqual(sulfurasQuality)

    expect(items[4].name).toEqual(SpecialItemTypes.Conjured)
    expect(items[4].sellIn).toEqual(conjuredSellIn)
    expect(items[4].quality).toEqual(conjuredQuality)
  })

  test('Item quality after day 1', () => {
    const dayCount = 1
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured
    expect(items[5].sellIn).toEqual(0)
    expect(items[6].sellIn).toEqual(-1)

    expect(items[0].quality).toEqual(normalItemQuality - dayCount) // random
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(conjuredQuality - dayCount * 2) // Conjured
    expect(items[5].quality).toEqual(9)
    expect(items[6].quality).toEqual(8)
  })

  test('Item quality after day 2', () => {
    const dayCount = 2
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured
    expect(items[5].sellIn).toEqual(-1)
    expect(items[6].sellIn).toEqual(-2)

    expect(items[0].quality).toEqual(normalItemQuality - dayCount) // random
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 1) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(conjuredQuality - dayCount * 2) // Conjured
    expect(items[5].quality).toEqual(7)
    expect(items[6].quality).toEqual(6)
  })

  test('Item quality after day 3', () => {
    const dayCount = 3
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(normalItemQuality - dayCount) // random
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 2) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(conjuredQuality - dayCount * 2) // Conjured
  })

  test('Item quality after day 4', () => {
    const dayCount = 4
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(normalItemQuality - dayCount - 1) // random -> expired, 2x penalty
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 3) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(conjuredQuality - dayCount * 2 - 2) // Conjured
  })

  test('Item quality after day 5', () => {
    const dayCount = 5
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(normalItemQuality - dayCount - 2) // random -> expired, 2x penalty
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 4) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(conjuredQuality - dayCount * 2 - 4) // Conjured
  })

  test('Item quality after day 6', () => {
    const dayCount = 6
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(normalItemQuality - dayCount - 3) // random -> expired, 2x penalty
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 5) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 7', () => {
    const dayCount = 7
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 7) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 8', () => {
    const dayCount = 8
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 9) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 9', () => {
    const dayCount = 9
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 11) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 10', () => {
    const dayCount = 10
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 13) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 11', () => {
    const dayCount = 11
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount) // AgedBrie
    expect(items[2].quality).toEqual(bkstPassQuality + dayCount + 15) // BackStagePasses
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 12 (all expired) -> 2x quality penalty', () => {
    const dayCount = 12
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount + 1) // AgedBrie
    expect(items[2].quality).toEqual(0) // BackStagePasses -> concert ended
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 13 (all expired) -> 2x quality penalty', () => {
    const dayCount = 13
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount + 2) // AgedBrie
    expect(items[2].quality).toEqual(0) // BackStagePasses -> concert ended
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 14 (all expired) -> 2x quality penalty', () => {
    const dayCount = 14
    const items = shop.updateQuality()

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(agedBrieQuality + dayCount + 3) // AgedBrie
    expect(items[2].quality).toEqual(0) // BackStagePasses -> concert ended
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })

  test('Item quality after day 42 (all expired) -> 2x quality penalty', () => {
    const dayCount = 42
    let items: Item[] = []
    for (let i = 14; i < 42; i++) {
      items = shop.updateQuality()
    }

    expect(items[0].sellIn).toEqual(normalItemSellIn - dayCount) // random
    expect(items[1].sellIn).toEqual(agedBrieSellIn - dayCount) // AgedBrie
    expect(items[2].sellIn).toEqual(bkstPassSellIn - dayCount) // BackStagePasses
    expect(items[3].sellIn).toEqual(sulfurasSellIn) // Sulfuras
    expect(items[4].sellIn).toEqual(conjuredSellIn - dayCount) // Conjured

    expect(items[0].quality).toEqual(0) // random -> expired, can't be lower than 0
    expect(items[1].quality).toEqual(50) // AgedBrie -> maxes out at 50
    expect(items[2].quality).toEqual(0) // BackStagePasses -> concert ended
    expect(items[3].quality).toEqual(sulfurasQuality) // Sulfuras
    expect(items[4].quality).toEqual(0) // Conjured
  })
})
