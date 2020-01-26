import Good, { types as goodTypes } from './good.js'

export default function Purchase () {
  const types = {
    regularImported: 'regular-imported',
    importedOfSomething: 'imported-of-something',
    regular: 'regular'
  }

  this.create = ({ input }) => {
    if (!this.isValid(input)) throw new Error('Invalid purchase input')

    this.input = input
    this.type = this.getType(input)
    const { amount, good, price } = this.breakInputIntoGoodAmountPrice(this.input)
    this.amount = amount
    this.good = new Good().create({ name: good })
    this.price = price
    return this
  }

  this.isRegular = (input) => {
    return /[0-9]{1,5}\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  this.isRegularImported = (input) => {
    return /[0-9]{1,5}\simported\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  this.isImportedOfSomething = (input) => {
    return /[0-9]{1,5}\s[\a-zA-Z\s]*\sof\simported\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  this.isImported = (input) => {
    return this.isRegularImported(input) || this.isImportedOfSomething(input)
  }

  this.isValid = (input) => {
    return this.isImported(input) || this.isRegular(input)
  }

  this.getType = (input) => {
    if (this.isRegularImported(input)) return types.regularImported
    if (this.isImportedOfSomething(input)) return types.importedOfSomething

    return types.regular
  }

  this.breakInputIntoGoodAmountPrice = (input) => {
    const amountRegex = /[0-9]{1,5}\s/
    const amount = parseInt(input.match(amountRegex)[0])
    const goodRegex = /\s[\a-zA-Z\s]*at/
    const good = input.match(goodRegex)[0].replace(' at', '').trim()
    const priceRegex = /[\[0-9]+(\.[0-9]+)?$]*/
    const price = parseFloat(input.match(priceRegex)[0])
    return { amount, good, price }
  }

  this.calculateTaxByGoodType = (type) => {
    return type === goodTypes.miscelaneous ? 0.1 : 0
  }

  this.calculateImportedTax = (type) => {
    return type === types.importedOfSomething || type === types.regularImported
    ? 0.05
    : 0
  }

  this.roundToNearest = (number) => {
    return Math.ceil((number) * 20)/20
  }

  this.roundToTwoDecimals = (number) => {
    return Math.round(number * 100) / 100
  }

  this.shouldRoundToNearest = (number) => {
    const decimals = number.toFixed(2).split('.')[1]
    const lastDecimal = parseInt(decimals.charAt(1))
    return lastDecimal < 5
  }

  this.calculateTaxes = ({ good, type, price }) => {
    const goodTax = this.calculateTaxByGoodType(good.type)
    const importedTax = this.calculateImportedTax(type)
    const taxes = goodTax + importedTax
    const taxValue = price * taxes
    return taxValue
  }

  this.calculateTotal = ({ good, amount, type, price }) => {
    const initialTaxValue = this.calculateTaxes({ good, type, price })
    const priceWithTaxes = price + initialTaxValue
    const rounded = this.shouldRoundToNearest(priceWithTaxes)
      ? this.roundToNearest(priceWithTaxes)
      : this.roundToTwoDecimals(priceWithTaxes)
    return rounded * amount
  }

  this.getTotal = () => {
    return this.calculateTotal(this)
  }

  this.getReceipt = () => {
    const result = `${this.amount} ${this.good.name}: ${this.calculateTotal(this).toFixed(2)}`
    return result
  }

  this.getTaxAmount = () => {
    const totalWithoutTaxes = this.price * this.amount
    const total = this.calculateTotal(this)
    return this.roundToTwoDecimals(total - totalWithoutTaxes)
  }
}