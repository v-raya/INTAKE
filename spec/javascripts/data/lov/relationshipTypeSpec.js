import RELATIONSHIP_TYPE from 'data/lov/relationshipType'

describe('RELATIONSHIP_TYPE', () => {
  it('has 128 values', () => {
    expect(RELATIONSHIP_TYPE.length).toEqual(128)
  })

  it('categorizes them all as relationship_type', () => {
    RELATIONSHIP_TYPE.forEach((code) => {
      expect(code.category).toEqual('relationship_type')
    })
  })
})
