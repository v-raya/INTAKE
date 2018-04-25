import {fromRoman} from 'utils/fromRoman'

describe('fromRoman ', () => {
  it('should return an empty string for no prop', () => {
    expect(fromRoman()).toEqual('')
  })
  it('should return an empty string for empty string prop', () => {
    expect(fromRoman('')).toEqual(0)
  })
  it('should return empty string for invalid prop', () => {
    expect(fromRoman('bad_prop')).toEqual(0)
  })
  it('should convert Roman value to Arabic', () => {
    expect(fromRoman('X')).toEqual(10)
  })
  it('should convert downCase Roman value to Arabic', () => {
    expect(fromRoman('x')).toEqual(10)
  })
})
