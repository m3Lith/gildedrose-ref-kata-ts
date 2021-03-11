/* eslint-disable operator-assignment */

import { SpecialItemTypes } from './consts'
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
      } else if (this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1
        if (this.items[i].name === SpecialItemTypes.BackStagePasses) {
          if (this.items[i].sellIn < 11) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
          if (this.items[i].sellIn < 6) {
            if (this.items[i].quality < 50) {
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
        } else if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
        }
      }
    }

    return this.items
  }
}
