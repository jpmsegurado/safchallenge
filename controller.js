import Purchase from './purchase.js'

export default function Controller () {
  this.onSubmit = function(event) {
    event.preventDefault()

    const input = document.getElementById('purchase').value
    const purchases = []
    const inputs = input.split('\n')
    inputs.forEach(input => { purchases.push(new Purchase().create({ input })) })
    purchases.forEach(p => console.log(p.getReceipt()))
    const totalTaxAmount = (purchases.reduce((total, purchase) => total + purchase.getTaxAmount(), 0)).toFixed(2)
    console.log(totalTaxAmount)
  }
}