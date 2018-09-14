import AGENCY_TYPE from 'data/lov/agencyType'

describe('AGENCY_TYPE', () => {
  it('has 3 values', () => {
    expect(AGENCY_TYPE.length).toEqual(3)
  })

  it('categorizes them all as agency_type', () => {
    AGENCY_TYPE.forEach((code) => {
      expect(code.category).toEqual('agency_type')
    })
  })
})
