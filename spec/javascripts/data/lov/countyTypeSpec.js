import ADDRESS_COUNTY from 'data/lov/addressCounty'

describe('ADDRESS_COUNTY', () => {
  it('has 59 values', () => {
    expect(ADDRESS_COUNTY.length).toEqual(59)
  })

  it('categorizes them all as address_county', () => {
    ADDRESS_COUNTY.forEach((code) => {
      expect(code.category).toEqual('address_county')
    })
  })

  it('has State of California', () => {
    expect(ADDRESS_COUNTY).toContain({
      code: '99',
      value: 'State of California',
      category: 'address_county',
      sub_category: null,
    })
  })
})
