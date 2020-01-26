import Controller from './controller.js'

const controller = new Controller()

const form = document.getElementById('form')
form.addEventListener('submit', controller.onSubmit)