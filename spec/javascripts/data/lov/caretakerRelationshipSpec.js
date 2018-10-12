import CARETAKER_RELATIONSHIP from 'data/lov/caretakerRelationship'

describe('CARETAKER_RELATIONSHIP', () => {
  it('has 17 values', () => {
    expect(CARETAKER_RELATIONSHIP.length).toEqual(17)
  })

  it('categorizes them all as caretaker_relationship', () => {
    CARETAKER_RELATIONSHIP.forEach((code) => {
      expect(code.category).toEqual('caretaker_relationship')
    })
  })
})
