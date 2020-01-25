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

  function breakInputByType (input) {
    switch ()
  }
}