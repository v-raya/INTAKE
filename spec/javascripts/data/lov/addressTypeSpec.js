import ADDRESS_TYPE from 'data/lov/addressType'

describe('ADDRESS_TYPE', () => {
  it('has 59 values', () => {
    expect(ADDRESS_TYPE.length).toEqual(10)
  })

  it('categorizes them all as address_type', () => {
    ADDRESS_TYPE.forEach((code) => {
      expect(code.category).toEqual('address_type')
    })
  })
})
