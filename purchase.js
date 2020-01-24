export default function Purchase ({ input }) {
  this.input = input
  this.imported = isImported(input)

  function isNormal (input) {
    return /[0-9]\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  function isImported (input) {
    return /[0-9]*\simported\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input) ||
    /[0-9]*\s[\a-zA-Z\s]*\sof\simported\s[\a-zA-Z\s]*\sat\s[\[0-9]+(\.[0-9]+)?$]*/.test(input)
  }

  this.isValid = function () {
    const input = this.input
    return isImported(input) || isNormal(input)
  }
}