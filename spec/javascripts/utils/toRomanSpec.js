import {toRoman} from 'utils/toRoman'

describe('toRoman ', () => {
  it('should return an empty string for no prop', () => {
    expect(toRoman()).toEqual('')
  })
  it('should return an empty string for empty string prop', () => {
    expect(toRoman('')).toEqual('')
  })
  it('should return empty string for invalid prop', () => {
    expect(toRoman('bad_prop')).toEqual('')
  })
  it('should convert an Integer to Roman', () => {
    expect(toRoman(10)).toEqual('X')
  })
  it('should convert string numerical value to Roman', () => {
    expect(toRoman('10')).toEqual('X')
  })
})
