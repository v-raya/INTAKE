import COUNTY from 'data/lov/county'

describe('county_type', () => {
  it('has 59 values', () => {
    expect(COUNTY.length).toEqual(59)
  })

  it('gives each a countyTypeCode and addressCountyCode', () => {
    COUNTY.forEach((code) => {
      expect(code.countyTypeCode).toBeDefined()
      expect(code.addressCountyCode).toBeDefined()
    })
  })

  it('has State of California', () => {
    expect(COUNTY).toContain({
      countyTypeCode: '1126',
      addressCountyCode: '99',
      value: 'State of California',
    })
  })
})
