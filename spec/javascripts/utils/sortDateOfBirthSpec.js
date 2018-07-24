import {sortDateOfBirth} from 'utils/sortDateOfBirth'

const ascOrder = 'asc'
const descOrder = 'desc'

describe('Sort Date Of Birth', () => {
  const a = {
    dateOfBirth: '10/29/1992',
  }

  const b = {
    dateOfBirth: '2/23/1995',
  }

  it('sorts by ascending order and return a negative value', () => {
    expect(sortDateOfBirth(a, b, ascOrder) < 0).toBe(true)
  })

  it('sorts by descending order and return a positive value', () => {
    expect(sortDateOfBirth(a, b, descOrder) > 0).toBe(true)
  })
})

describe('Sort Date Of Birth if DOB is empty string', () => {
  const a = {
    dateOfBirth: '',
  }

  const b = {
    dateOfBirth: '2/23/1995',
  }

  const c = {
    dateOfBirth: '2/23/1995',
  }

  const d = {
    dateOfBirth: '',
  }

  it('sorts by ascending order and return a negative value', () => {
    expect(sortDateOfBirth(a, b, ascOrder) < 0).toBe(true)
  })

  it('sorts by descending order and return a positive value', () => {
    expect(sortDateOfBirth(a, b, descOrder) > 0).toBe(true)
  })
  it('sorts by ascending order and return a positive value', () => {
    expect(sortDateOfBirth(c, d, ascOrder) > 0).toBe(true)
  })
  it('sorts by descending order and return a negative value', () => {
    expect(sortDateOfBirth(c, d, descOrder) < 0).toBe(true)
  })
})

describe('Return 0 if DOBs are empty', () => {
  const a = {
    dateOfBirth: '',
  }

  const b = {
    dateOfBirth: '',
  }

  it('sorts by ascending order and return a negative value', () => {
    expect(sortDateOfBirth(a, b, ascOrder) === 0).toBe(true)
  })

  it('sorts by descending order and return a positive value', () => {
    expect(sortDateOfBirth(a, b, descOrder) === 0).toBe(true)
  })
})
