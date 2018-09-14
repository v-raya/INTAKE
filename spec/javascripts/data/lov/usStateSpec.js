import US_STATE from 'data/lov/usState'

describe('US_STATE', () => {
  it('has 58 values', () => {
    expect(US_STATE.length).toEqual(58)
  })

  it('categorizes them all as us_state', () => {
    US_STATE.forEach((code) => {
      expect(code.category).toEqual('us_state')
    })
  })

  it('also contains some territories', () => {
    expect(US_STATE).toContain({
      code: '1875',
      value: 'Virgin Islands',
      category: 'us_state',
      sub_category: null,
    })
  })
})
