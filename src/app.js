import Controller from './controller.js'

document.addEventListener('DOMContentLoaded', () => {
  const controller = new Controller()
  const form = document.getElementById('form')
  form.addEventListener('submit', controller.onSubmit)
})