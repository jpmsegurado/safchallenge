import Good, { types as goodTypes } from './good.js'

export default function Purchase () {
  const types = {
    regularImported: 'regular-imported',
    importedOfSomething: 'imported-of-something',
    regular: 'regular'
  }

  this.create = ({ input }) => {
    if (!isValid(input)) throw new Error('Invalid purchase input')

    this.input = input
    this.type = getType(input)
    const { amount, good, price } = breakInputIntoGoodAmountPrice(this.input)
    this.amount = amount
    this.good = new Good().create({ name: good })
    this.price = price
    return this
  }

  function isRegular (input) {
    return /[0-9]{1,5}\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  function isRegularImported (input) {
    return /[0-9]{1,5}\simported\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  function isImportedOfSomething (input) {
    return /[0-9]{1,5}\s[\a-zA-Z\s]*\sof\simported\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  function isImported (input) {
    return isRegularImported(input) || isImportedOfSomething(input)
  }

  function isValid (input) {
    return isImported(input) || isRegular(input)
  }

  function getType (input) {
    if (isRegularImported(input)) return types.regularImported
    if (isImportedOfSomething(input)) return types.importedOfSomething

    return types.regular
  }

  function breakInputIntoGoodAmountPrice (input) {
    const amountRegex = /[0-9]{1,5}\s/
    const amount = parseInt(input.match(amountRegex)[0])
    const goodRegex = /\s[\a-zA-Z\s]*at/
    const good = input.match(goodRegex)[0].replace(' at', '').trim()
    const priceRegex = /[\[0-9]+(\.[0-9]+)?$]*/
    const price = parseFloat(input.match(priceRegex)[0])
    return { amount, good, price }
  }

  function calculateTaxByGoodType (type) {
    return type === goodTypes.miscelaneous ? 0.1 : 0
  }

  function calculateImportedTax (type) {
    return type === types.importedOfSomething || type === types.regularImported
    ? 0.05
    : 0
  }

  function roundToNearest (number) {
    return Math.ceil((number) * 20)/20
  }

  function roundToTwoDecimals (number) {
    return Math.round(number * 100) / 100
  }

  function shouldRoundToNearest (number) {
    const decimals = number.toFixed(2).split('.')[1]
    const lastDecimal = parseInt(decimals.charAt(1))
    return lastDecimal < 5
  }

  function calculateTaxes ({ good, type, price }) {
    const goodTax = calculateTaxByGoodType(good.type)
    const importedTax = calculateImportedTax(type)
    const taxes = goodTax + importedTax
    const taxValue = price * taxes
    return taxValue
  }

  function calculateTotal ({ good, amount, type, price }) {
    const initialTaxValue = calculateTaxes({ good, type, price })
    const priceWithTaxes = price + initialTaxValue
    const rounded = shouldRoundToNearest(priceWithTaxes)
      ? roundToNearest(priceWithTaxes)
      : roundToTwoDecimals(priceWithTaxes)
    return rounded * amount
  }

  this.getTotal = () => {
    return calculateTotal(this)
  }

  this.getReceipt = () => {
    const result = `${this.amount} ${this.good.name}: ${calculateTotal(this).toFixed(2)}`
    return result
  }

  this.getTaxAmount = () => {
    const totalWithoutTaxes = this.price * this.amount
    const total = calculateTotal(this)
    return roundToTwoDecimals(total - totalWithoutTaxes)
  }
}