import Purchase from './purchase.js'

export default function Controller () {

  this.createPurchases = (input) => {
    const purchases = []
    const inputs = input.split('\n')
    inputs.forEach(input => { purchases.push(new Purchase().create({ input })) })
    return purchases
  }

  this.generateReceipts = (purchases) => {
    let taxSaleAmount = 0
    let total = 0
    let receipts = ''

    purchases.forEach((purchase) => {
      taxSaleAmount = taxSaleAmount + purchase.getTaxAmount()
      total = total + purchase.getTotal()
      receipts = receipts + purchase.getReceipt() + '\n'
    })

    receipts = receipts + 'Sales Taxes: ' + taxSaleAmount.toFixed(2) + '\n'
    receipts = receipts + 'Total: ' + total

    return receipts
  }

  this.onSubmit = (event) => {
    event.preventDefault()
    const input = document.getElementById('purchase').value
    const results = document.getElementById('results')

    try {
      const purchases = this.createPurchases(input)
      const receipts = this.generateReceipts(purchases)
      results.value = receipts
    } catch (e) {
      results.value = e.message
    }
  }
}