import COUNTY_TYPE from 'data/lov/countyType'

describe('county_type', () => {
  it('has 59 values', () => {
    expect(COUNTY_TYPE.length).toEqual(59)
  })

  it('categorizes them all as county_type', () => {
    COUNTY_TYPE.forEach((code) => {
      expect(code.category).toEqual('county_type')
    })
  })

  it('has State of California', () => {
    expect(COUNTY_TYPE).toContain({
      code: '1126',
      value: 'State of California',
      category: 'county_type',
      sub_category: null,
    })
  })
})
