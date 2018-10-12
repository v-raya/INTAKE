import LOV from 'data/lov/lov'

describe('LOV', () => {
  it('has a lot of them', () => {
    expect(LOV.length).toEqual(522)
  })

  it('contains code, value, category, and sub_category', () => {
    LOV.forEach((code) => {
      expect(code.code).toBeDefined()
      expect(code.value).toBeDefined()
      expect(code.category).toBeDefined()
      expect(code.sub_category).toBeDefined()
    })
  })

  it('contains no duplicates', () => {
    LOV.forEach((code) => {
      const others = LOV.filter((c) => c !== code)

      expect(others).not.toContain(code)
    })
  })
})
