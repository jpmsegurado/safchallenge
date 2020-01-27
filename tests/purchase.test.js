import Purchase from '../src/purchase'

describe('Purchase', () => {
  describe('#methods', () => {
    describe('#create', () => {
      it('when called with invalid input it throws an error', () => {
        try {
          new Purchase().create({ input: '123' })
        } catch (e) {
          expect(e.message).toEqual('Invalid purchase input')
        }
      })

      it('when called with valid input it sets amount, good, and price', () => {
        const purchase = new Purchase().create({ input: '1 book at 10.40' })
        expect(purchase.price).toBe(10.40)
        expect(purchase.amount).toBe(1)
        expect(purchase.good.name).toBe('book')
      })
    })

    describe('#isRegular', () => {
      it('when called with a regular purchase input it returns true', () => {
        const purchase = new Purchase().create({ input: '1 book at 10.40' })
        expect(purchase.isRegular(purchase.input)).toBe(true)
      })
    })

    describe('#isRegularImported', () => {
      it('when called with a regular imported purchase input it returns true', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.40' })
        expect(purchase.isRegularImported(purchase.input)).toBe(true)
      })
    })

    describe('#isImportedOfSomething', () => {
      it('when called with an imported of [...] input it returns true', () => {
        const purchase = new Purchase().create({ input: '1 box of imported chocolates at 10.40' })
        expect(purchase.isImportedOfSomething(purchase.input)).toBe(true)
      })
    })

    describe('#isImported', () => {
      it('when called with an imported of [...] purchase input it returns true', () => {
        const purchase = new Purchase().create({ input: '1 box of imported chocolates at 10.40' })
        expect(purchase.isImported(purchase.input)).toBe(true)
      })

      it('when called with a regular purchase input it returns true', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.40' })
        expect(purchase.isImported(purchase.input)).toBe(true)
      })
    })

    describe('#breakInputIntoGoodAmountPrice', () => {
      it('when called it returns an object with amount, price, and good', () => {
        const purchase = new Purchase().create({ input: '1 book at 10.40' })
        const object = purchase.breakInputIntoGoodAmountPrice(purchase.input)
        expect(object).toEqual({
          good: 'book',
          price: 10.40,
          amount: 1
        })
      })
    })

    describe('#calculateTaxByGoodType', () => {
      it('when called with a miscelaneous good it returns 0.1 (10%)', () => {
        const purchase = new Purchase().create({ input: '1 bubble gum at 10.40' })
        expect(purchase.calculateTaxByGoodType(purchase.good.type)).toBe(0.1)
      })

      it('when called with a not miscelaneous good it returns 0 (0%)', () => {
        const purchase = new Purchase().create({ input: '1 book at 10.40' })
        expect(purchase.calculateTaxByGoodType(purchase.good.type)).toBe(0)
      })
    })

    describe('#calculateImportedTax', () => {
      it('when called with an imported good it returns 0.05 (5%)', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.40' })
        expect(purchase.calculateImportedTax(purchase.type)).toBe(0.05)
      })

      it('when called with a not imported good it returns 0 (0%)', () => {
        const purchase = new Purchase().create({ input: '1 book at 10.40' })
        expect(purchase.calculateImportedTax(purchase.type)).toBe(0)
      })
    })

    describe('#roundToNearest', () => {
      it('when called with 10.31 it rounds number to 10.35', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.31' })
        expect(purchase.roundToNearest(purchase.price)).toBe(10.35)
      })
    })

    describe('#roundToTwoDecimals', () => {
      it('when called with 10.899 it rounds to 10.90', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.899' })
        expect(purchase.roundToTwoDecimals(purchase.price)).toBe(10.90)
      })
    })

    describe('#shouldRoundToNearest', () => {
      it('when called with 10.31 it retuns true', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.31' })
        expect(purchase.shouldRoundToNearest(purchase.price)).toBe(true)
      })

      it('when called with 10.36 it retuns false', () => {
        const purchase = new Purchase().create({ input: '1 imported book at 10.36' })
        expect(purchase.shouldRoundToNearest(purchase.price)).toBe(false)
      })
    })

    describe('#calculateTaxes', () => {
      it('when called with a regular miscelanous good it returns 10% of the price', () => {
        const purchase = new Purchase().create({ input: '1 tshirt at 100.00' })
        expect(purchase.calculateTaxes(purchase)).toBe(10)
      })

      it('when called with an imported good it returns 10% of the price', () => {
        const purchase = new Purchase().create({ input: '1 imported tshirt at 100.00' })
        expect(purchase.calculateTaxes(purchase)).toBe(15)
      })
    })

    describe('#calculateTotal', () => {
      it('when called with an imported good (food type) with amount 3, price 11.25 returns 35.55', () => {
        const purchase = new Purchase().create({ input: '3 box of imported chocolates at 11.25' })
        expect(purchase.calculateTotal(purchase)).toBe(35.55)
      })

      it('when called with a medical good with amount 1, price 9.75 returns 9.75', () => {
        const purchase = new Purchase().create({ input: '1 packet of headache pills at 9.75' })
        expect(purchase.calculateTotal(purchase)).toBe(9.75)
      })
    })

    describe('#getTotal', () => {
      it('when called with a medical good with amount 1, price 9.75 returns 9.75', () => {
        const purchase = new Purchase().create({ input: '1 packet of headache pills at 9.75' })
        expect(purchase.getTotal(purchase)).toBe(9.75)
      })
    })

    describe('#getReceipt', () => {
      const firstReceipt = '3 imported box of chocolates: 35.55'

      it(`when called with an imported good (food type) with amount 3, price 11.25 returns "${firstReceipt}"`, () => {
        const purchase = new Purchase().create({ input: '3 box of imported chocolates at 11.25' })
        expect(purchase.getReceipt(purchase)).toBe(firstReceipt)
      })

      const secondReceipt = '1 bottle of perfume: 20.89'

      it(`when called with a regular miscelaneous with amount 1, price 18.99 returns "${secondReceipt}"`, () => {
        const purchase = new Purchase().create({ input: '1 bottle of perfume at 18.99' })
        expect(purchase.getReceipt(purchase)).toBe(secondReceipt)
      })
    })

    describe('#getTaxAmount', () => {
      it('when called with a regular miscelaneous with amount 1, price 18.99 returns 1.9', () => {
        const purchase = new Purchase().create({ input: '1 bottle of perfume at 18.99' })
        expect(purchase.getTaxAmount(purchase)).toBe(1.9)
      })
    })
  })
})