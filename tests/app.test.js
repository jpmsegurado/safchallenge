import '../src/app'

describe('App', () => {

  it('when initialized adds event listener on form', () => {
    const form = document.createElement('form')
    form.setAttribute('id', 'form')
    document.body.appendChild(form)
    const spy = jest.spyOn(form, 'addEventListener')
    document.addEventListener('DOMContentLoaded', () => {
      expect(spy).toHaveBeenCalled()
    })
  })
})