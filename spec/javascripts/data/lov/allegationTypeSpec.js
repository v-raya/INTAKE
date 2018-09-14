import ALLEGATION_TYPE from 'data/lov/allegationType'

describe('ALLEGATION_TYPE', () => {
  it('has 8 values', () => {
    expect(ALLEGATION_TYPE.length).toEqual(8)
  })

  it('categorizes them all as allegation_type', () => {
    ALLEGATION_TYPE.forEach((code) => {
      expect(code.category).toEqual('allegation_type')
    })
  })
})
