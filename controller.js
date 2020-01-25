import Purchase from './purchase.js'

export default function Controller () {
  this.onSubmit = function(event) {
    event.preventDefault()

    const input = document.getElementById('purchase').value
    const purchase = new Purchase().create({ input })
    console.log(purchase)
    // console.log(purchase.input, purchase.type)
  }
}