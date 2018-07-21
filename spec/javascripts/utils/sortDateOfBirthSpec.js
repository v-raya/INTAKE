import {sortDateOfBirth} from 'utils/sortDateOfBirth'

describe('Sort Date Of Birth', () => {
  const a = {
    dateOfBirth: '10/29/1992',
  }

  const b = {
    dateOfBirth: '2/23/1995',
  }

  const asccorder = 'asc'
  const descorder = 'desc'

  it('sorts by ascending order and return a negative value', () => {
    expect(sortDateOfBirth(a, b, asccorder) < 0).toBe(true)
  })

  it('sorts by descending order and return a positive value', () => {
    expect(sortDateOfBirth(a, b, descorder) > 0).toBe(true)
  })
})
