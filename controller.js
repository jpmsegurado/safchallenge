import Purchase from './purchase.js'

export default function Controller () {

  function createPurchases(input) {
    const purchases = []
    const inputs = input.split('\n')
    inputs.forEach(input => { purchases.push(new Purchase().create({ input })) })
    return purchases
  }

  function generateReceipts (purchases) {
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

  this.onSubmit = function(event) {
    event.preventDefault()

    const input = document.getElementById('purchase').value
    const purchases = createPurchases(input)

    const results = document.getElementById('results')
    const receipts = generateReceipts(purchases)
    results.value = receipts
  }
}