/* eslint-disable operator-assignment */

import { BCKST_PASS_TRIGGER_10, BCKST_PASS_TRIGGER_5, MAX_QUALITY, SpecialItemTypes } from './consts'
import Item from './item'

export default class GildedRose {
  public items: Array<Item>

  constructor(items: Item[] = []) {
    this.items = items
  }

  public updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name !== SpecialItemTypes.AgedBrie && this.items[i].name !== SpecialItemTypes.BackStagePasses) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== SpecialItemTypes.Sulfuras) {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else if (this.items[i].quality < MAX_QUALITY) {
        this.items[i].quality = this.items[i].quality + 1
        if (this.items[i].name === SpecialItemTypes.BackStagePasses) {
          if (this.items[i].sellIn <= BCKST_PASS_TRIGGER_10) {
            if (this.items[i].quality < MAX_QUALITY) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
          if (this.items[i].sellIn <= BCKST_PASS_TRIGGER_5) {
            if (this.items[i].quality < MAX_QUALITY) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
        }
      }
      if (this.items[i].name !== SpecialItemTypes.Sulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - 1
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== SpecialItemTypes.AgedBrie) {
          if (this.items[i].name !== SpecialItemTypes.BackStagePasses) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== SpecialItemTypes.Sulfuras) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else if (this.items[i].quality < MAX_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1
        }
      }
    }

    return this.items
  }
}
