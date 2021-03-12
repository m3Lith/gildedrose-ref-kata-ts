/* eslint-disable no-restricted-syntax */

import {
  BCKST_PASS_TRIGGER_10,
  BCKST_PASS_TRIGGER_5,
  Q_STEP,
  MIN_QUALITY,
  MAX_QUALITY,
  SpecialItemTypes,
} from './consts'
import Item from './item'

export default class GildedRose {
  private items: Array<Item>

  constructor(items: Item[] = []) {
    this.items = items
  }

  public getItems(): Item[] {
    return this.items
  }

  public updateQuality(): Item[] {
    for (const item of this.items) {
      if (!GildedRose.isAgedBrie(item.name) && !GildedRose.isBackStagePass(item.name)) {
        item.quality = GildedRose.decreaseQuality(item)
      } else {
        item.quality = GildedRose.increaseQuality(item)
      }

      item.sellIn = GildedRose.decreaseSellIn(item)

      if (GildedRose.isExpired(item.sellIn)) {
        if (!GildedRose.isAgedBrie(item.name)) {
          item.quality = !GildedRose.isBackStagePass(item.name) ? GildedRose.decreaseQuality(item) : MIN_QUALITY
        } else {
          item.quality = GildedRose.increaseQuality(item)
        }
      }
    }

    return this.items
  }

  public static decreaseSellIn(item: Item): number {
    let { sellIn } = item

    if (!GildedRose.isSulfuras(item.name)) {
      sellIn = item.sellIn - 1
    }

    return sellIn
  }

  public static decreaseQuality(item: Item): number {
    let { quality } = item

    if (quality > MIN_QUALITY && !GildedRose.isSulfuras(item.name)) {
      quality -= Q_STEP
      if (GildedRose.isConjured(item.name) && quality > MIN_QUALITY) {
        quality -= Q_STEP
      }
    }

    return quality
  }

  public static increaseQuality(item: Item): number {
    let { quality } = item

    if (quality < MAX_QUALITY) {
      quality += Q_STEP
      if (GildedRose.isBackStagePass(item.name)) {
        quality = GildedRose.adjustBackStagePasses(item.sellIn, quality)
      }
    }

    return quality
  }

  public static adjustBackStagePasses(itemSellIn: number, itemQuality: number): number {
    let quality = itemQuality

    if (itemSellIn <= BCKST_PASS_TRIGGER_10 && quality < MAX_QUALITY) {
      quality += Q_STEP
      if (itemSellIn <= BCKST_PASS_TRIGGER_5 && quality < MAX_QUALITY) {
        quality += Q_STEP
      }
    }

    return quality
  }

  public static isAgedBrie(name: string): boolean {
    return name === SpecialItemTypes.AgedBrie
  }

  public static isBackStagePass(name: string): boolean {
    return name === SpecialItemTypes.BackStagePasses
  }

  public static isSulfuras(name: string): boolean {
    return name === SpecialItemTypes.Sulfuras
  }

  public static isConjured(name: string): boolean {
    return name === SpecialItemTypes.Conjured
  }

  public static isExpired(sellIn: number): boolean {
    return sellIn < 0
  }
}
