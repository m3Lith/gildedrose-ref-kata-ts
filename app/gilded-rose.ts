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
        if (item.quality > 0) {
          if (item.name !== SpecialItemTypes.Sulfuras) {
            item.quality = item.quality - 1
          }
          if (item.name === SpecialItemTypes.Conjured && item.quality > 0) {
            item.quality = item.quality - 1
          }
        }
      } else if (item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1
        if (item.name === SpecialItemTypes.BackStagePasses) {
          if (item.sellIn <= BCKST_PASS_TRIGGER_10) {
            if (item.quality < MAX_QUALITY) {
              item.quality = item.quality + 1
            }
          }
          if (item.sellIn <= BCKST_PASS_TRIGGER_5) {
            if (item.quality < MAX_QUALITY) {
              item.quality = item.quality + 1
            }
          }
        }
      }
      if (item.name !== SpecialItemTypes.Sulfuras) {
        item.sellIn = item.sellIn - 1
      }
      if (item.sellIn < 0) {
        if (item.name !== SpecialItemTypes.AgedBrie) {
          if (item.name !== SpecialItemTypes.BackStagePasses) {
            if (item.quality > 0) {
              if (item.name !== SpecialItemTypes.Sulfuras) {
                item.quality = item.quality - 1
              }
              if (item.name === SpecialItemTypes.Conjured && item.quality > 0) {
                item.quality = item.quality - 1
              }
            }
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
}
