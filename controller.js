import Purchase from './purchase.js'

export default function Controller () {

  const form = document.getElementById('form')
  function onSubmit(event) {
    event.preventDefault()

    const input = document.getElementById('purchase').value
    const purchase = new Purchase({ input })
    console.log(purchase.input, purchase.isValid())
  }
  form.addEventListener('submit', onSubmit)
}