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

  test('decreaseQuality()', () => {
    const normalItem = new Item('normalItemName', normalItemSellIn, 10)
    const itemQualityZero = new Item('normalItemName', normalItemSellIn, 0)
    const sulfuras = new Item(SpecialItemTypes.Sulfuras, sulfurasSellIn, sulfurasQuality)
    const conjured = new Item(SpecialItemTypes.Conjured, conjuredSellIn, conjuredQuality)

    let quality = GildedRose.decreaseQuality(normalItem)
    expect(quality).toEqual(9)

    quality = GildedRose.decreaseQuality(itemQualityZero)
    expect(quality).toEqual(0)

    quality = GildedRose.decreaseQuality(sulfuras)
    expect(quality).toEqual(80)

    quality = GildedRose.decreaseQuality(conjured)
    expect(quality).toEqual(13)
  })

  test('increaseQuality()', () => {
    const agedBrie = new Item(SpecialItemTypes.AgedBrie, agedBrieSellIn, agedBrieQuality)
    const bkstPass = new Item(SpecialItemTypes.BackStagePasses, bkstPassSellIn, bkstPassQuality)

    let quality = GildedRose.increaseQuality(bkstPass)
    expect(quality).toEqual(11)

    quality = GildedRose.increaseQuality(agedBrie)
    expect(quality).toEqual(11)
  })

  test('decreaseSellIn()', () => {
    const bkstPass = new Item(SpecialItemTypes.BackStagePasses, 11, 10)
    const sulfuras = new Item(SpecialItemTypes.Sulfuras, 11, 10)

    let sellIn = GildedRose.decreaseSellIn(bkstPass)
    expect(sellIn).toEqual(10)

    sellIn = GildedRose.decreaseSellIn(sulfuras)
    expect(sellIn).toEqual(11)
  })

  test('adjustBackStagePasses()', () => {
    let quality = GildedRose.adjustBackStagePasses(11, 10)
    expect(quality).toEqual(10)

    quality = GildedRose.adjustBackStagePasses(10, 10)
    expect(quality).toEqual(11)

    quality = GildedRose.adjustBackStagePasses(5, 10)
    expect(quality).toEqual(12)
  })
})
