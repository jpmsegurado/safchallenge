import Controller from '../src/controller'

describe('Controller', () => {
  describe('#methods', () => {
    describe('#createPurchases', () => {
      it('when called with a valid input of 2 purchases it return 2 purchases', () => {
        const controller = new Controller()
        const input = '1 book at 10.00\n2 box of chocolates at 20.00'
        const purchases = controller.createPurchases(input)
        expect(purchases.length).toBe(2)
      })
    })

    describe('#generateReceipts', () => {
      it('when called with 2 purchases it generate the recipe', () => {
        const expected = '1 book: 10.00\n' +
        '2 box of chocolates: 40.00\n' +
        'Sales Taxes: 0.00\n' +
        'Total: 50'

        const controller = new Controller()
        const input = '1 book at 10.00\n2 box of chocolates at 20.00'
        const purchases = controller.createPurchases(input)
        const receipt = controller.generateReceipts(purchases)
        expect(receipt).toBe(expected)
      })
    })

    describe('#onSubmit', () => {
      let event, purchase, results, controller
      const expected = '1 book: 10.00\n' +
        '2 box of chocolates: 40.00\n' +
        'Sales Taxes: 0.00\n' +
        'Total: 50'

      const error = 'Invalid purchase input'

      purchase = document.createElement('textarea')
      purchase.setAttribute('id', 'purchase')
      document.body.appendChild(purchase)

      results = document.createElement('textarea')
      results.setAttribute('id', 'results')
      document.body.appendChild(results)

      beforeEach(() => {
        event = { preventDefault: jest.fn() }

        purchase.value = '1 book at 10.00\n2 box of chocolates at 20.00'
        results.value = expected

        controller = new Controller()
      })

      it('when called it calls preventDefault from event param', () => {
        controller.onSubmit(event)
        expect(event.preventDefault).toHaveBeenCalled()
      })

      it('when called with valid input it renders what is expected', () => {
        controller.onSubmit(event)
        expect(results.value).toBe(expected)
      })

      it('when called with invalid input it renders an error', () => {
        purchase.value = '123'
        results.value = error

        controller.onSubmit(event)
        expect(results.value).toBe(error)
      })
    })
  })
})