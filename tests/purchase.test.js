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
  })
})