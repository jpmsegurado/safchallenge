import Purchase from '../src/purchase'

describe('Purchase', () => {
  describe('#methods', () => {
    describe('#create', () => {
      expect(new Purchase().create({ input: '123' })).toThrow(Error)
    })
  })
})