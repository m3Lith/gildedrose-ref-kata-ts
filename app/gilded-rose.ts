/* eslint-disable no-restricted-syntax */
/* eslint-disable operator-assignment */

import { BCKST_PASS_TRIGGER_10, BCKST_PASS_TRIGGER_5, MAX_QUALITY, SpecialItemTypes } from './consts'
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
      if (item.name !== SpecialItemTypes.AgedBrie && item.name !== SpecialItemTypes.BackStagePasses) {
        item.quality = GildedRose.decreaseQuality(item)
      } else if (item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1
        if (item.name === SpecialItemTypes.BackStagePasses) {
          item.quality = GildedRose.adjustBackStagePasses(item)
        }
      }
      if (item.name !== SpecialItemTypes.Sulfuras) {
        item.sellIn = item.sellIn - 1
      }
      if (item.sellIn < 0) {
        if (item.name !== SpecialItemTypes.AgedBrie) {
          if (item.name !== SpecialItemTypes.BackStagePasses) {
            item.quality = GildedRose.decreaseQuality(item)
          } else {
            item.quality = item.quality - item.quality
          }
        } else if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1
        }
      }
    }

    return this.items
  }

  private static decreaseQuality(item: Item): number {
    let { quality } = item

    if (quality > 0 && item.name !== SpecialItemTypes.Sulfuras) {
      quality = quality - 1
      if (item.name === SpecialItemTypes.Conjured && quality > 0) {
        quality = quality - 1
      }
    }

    return quality
  }

  private static adjustBackStagePasses(item: Item): number {
    let { quality } = item

    if (item.sellIn <= BCKST_PASS_TRIGGER_10 && quality < MAX_QUALITY) {
      quality = quality + 1
    }
    if (item.sellIn <= BCKST_PASS_TRIGGER_5 && quality < MAX_QUALITY) {
      quality = quality + 1
    }

    return quality
  }
}
