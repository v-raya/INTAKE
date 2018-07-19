import {ageFormatter} from 'utils/ageFormatter'

describe('ageFormatter', () => {
  it('should return fortmatted age when age and ageUnits are valid ', () => {
    expect(ageFormatter({age: 20, ageUnit: 'Y'})).toEqual('20 yrs')
    expect(ageFormatter({age: 20, ageUnit: 'M'})).toEqual('20 mos')
    expect(ageFormatter({age: 20, ageUnit: 'D'})).toEqual('20 dys')
  })

  it('should be empty if age is a string/empty and ageUnits are valid', () => {
    expect(ageFormatter({age: '20', ageUnit: 'Y'})).toEqual('')
    expect(ageFormatter({age: null, ageUnit: 'M'})).toEqual('')
    expect(ageFormatter({age: null, ageUnit: 'D'})).toEqual('')
  })

  it('should be empty if age is valid and ageUnits are empty', () => {
    expect(ageFormatter({age: 0, ageUnit: ''})).toEqual('')
    expect(ageFormatter({age: 1, ageUnit: ''})).toEqual('')
    expect(ageFormatter({age: 20, ageUnit: ''})).toEqual('')
  })

  it('should be empty if age and ageUnits are invalid ', () => {
    expect(ageFormatter({age: 20, ageUnit: 'Z'})).toEqual('')
    expect(ageFormatter({age: 'B', ageUnit: 'X'})).toEqual('')
    expect(ageFormatter({age: -1, ageUnit: 'M'})).toEqual('')
    expect(ageFormatter({age: null, ageUnit: null})).toEqual('')
  })
})
