export const types = {
  book: 'book',
  medical: 'medical',
  food: 'food',
  miscelaneous: 'miscelaneous'
}

export default function Good () {

  const book = ['book']
  const medical = ['packet of headache pills']
  const food = ['chocolate bar', 'box of chocolates']

  this.create = ({ name }) => {
    this.name = name

    if (book.includes(name)) this.type = types.book
    else if (medical.includes(name)) this.type = types.medical
    else if (food.includes(name)) this.type = types.food
    else this.type = types.miscelaneous

    return this
  }
}