import {
  isCommaSuffix,
  formatNameSuffix,
  formatHighlightedSuffix,
  default as nameFormatter,
} from 'utils/nameFormatter'

describe('isCommaSuffix', () => {
  it('should be true for name suffixes', () => {
    expect(isCommaSuffix('jr')).toEqual(true)
    expect(isCommaSuffix('jd')).toEqual(true)
    expect(isCommaSuffix('md')).toEqual(true)
    expect(isCommaSuffix('phd')).toEqual(true)
  })

  it('should be false for number suffixes', () => {
    expect(isCommaSuffix('ii')).toEqual(false)
    expect(isCommaSuffix('iii')).toEqual(false)
    expect(isCommaSuffix('ix')).toEqual(false)
    expect(isCommaSuffix('2')).toEqual(false)
    expect(isCommaSuffix('3')).toEqual(false)
    expect(isCommaSuffix('9')).toEqual(false)
  })

  it('should downcase the suffix', () => {
    expect(isCommaSuffix('Jr')).toEqual(true)
    expect(isCommaSuffix('PhD')).toEqual(true)
    expect(isCommaSuffix('III')).toEqual(false)
    expect(isCommaSuffix('iIi')).toEqual(false)
  })

  it('should be false for unknown values', () => {
    expect(isCommaSuffix('OFM')).toEqual(false)
    expect(isCommaSuffix('Primate of Italy')).toEqual(false)
    expect(isCommaSuffix(null)).toEqual(false)
    expect(isCommaSuffix(3)).toEqual(false)
  })
})

describe('formatNameSuffix', () => {
  it('should format number suffixes', () => {
    expect(formatNameSuffix('2')).toEqual('II')
    expect(formatNameSuffix('3')).toEqual('III')
    expect(formatNameSuffix('37')).toEqual('XXXVII')
  })

  it('should format roman numeral suffixes', () => {
    expect(formatNameSuffix('II')).toEqual('II')
    expect(formatNameSuffix('III')).toEqual('III')
    expect(formatNameSuffix('XXXVII')).toEqual('XXXVII')
  })

  it('should handle mixed case numerals', () => {
    expect(formatNameSuffix('iii')).toEqual('III')
    expect(formatNameSuffix('III')).toEqual('III')
    expect(formatNameSuffix('iIi')).toEqual('III')
  })

  it('should be falsy for invalid suffixes', () => {
    expect(Boolean(formatNameSuffix('OFM'))).toEqual(false)
    expect(Boolean(formatNameSuffix('Primate of Italy'))).toEqual(false)
    expect(Boolean(formatNameSuffix(null))).toEqual(false)
    expect(Boolean(formatNameSuffix(3))).toEqual(false)
  })
})

describe('formatHighlightedSuffix', () => {
  it('should format number suffixes', () => {
    expect(formatHighlightedSuffix('2')).toEqual('II')
    expect(formatHighlightedSuffix('<em>3</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<em>3</em>7')).toEqual('<em>XXXVII</em>')
  })

  it('should format roman numeral suffixes', () => {
    expect(formatHighlightedSuffix('<em>II</em>')).toEqual('<em>II</em>')
    expect(formatHighlightedSuffix('III')).toEqual('III')
    expect(formatHighlightedSuffix('<em>XX</em>XVII')).toEqual('<em>XXXVII</em>')
  })

  it('should handle mixed case numerals', () => {
    expect(formatHighlightedSuffix('<em>iii</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<em>III</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<em>iIi</em>')).toEqual('<em>III</em>')
  })

  it('should handle mixed case emphasis', () => {
    expect(formatHighlightedSuffix('<em>iii</em>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<EM>iii</EM>')).toEqual('<em>III</em>')
    expect(formatHighlightedSuffix('<Em>iii</eM>')).toEqual('<em>III</em>')
  })

  it('should be falsy for invalid suffixes', () => {
    expect(Boolean(formatHighlightedSuffix('OFM'))).toEqual(false)
    expect(Boolean(formatHighlightedSuffix('Primate of Italy'))).toEqual(false)
    expect(Boolean(formatHighlightedSuffix(null))).toEqual(false)
    expect(Boolean(formatHighlightedSuffix(3))).toEqual(false)
  })
})

describe('nameFormatter', () => {
  it('renders a full name', () => {
    expect(nameFormatter({
      first_name: 'Foo',
      last_name: 'Bar',
    })).toEqual('Foo Bar')
  })

  it('renders with a blank first name', () => {
    expect(nameFormatter({
      first_name: null,
      last_name: 'Bar',
    })).toEqual('(Unknown first name) Bar')
  })

  it('renders with a blank last name', () => {
    expect(nameFormatter({
      first_name: 'Foo',
      last_name: null,
    })).toEqual('Foo (Unknown last name)')
  })

  it('renders with a blank first name and blank last name', () => {
    expect(nameFormatter({
      first_name: null,
      last_name: null,
    })).toEqual('Unknown Person')
  })

  it('Uses the nameDefault, when present, if there are no first and last names', () => {
    expect(nameFormatter({
      first_name: null,
      last_name: null,
      name_default: 'Unknown Clown',
    })).toEqual('Unknown Clown')
  })

  it('Accepts an empty string as a nameDefault', () => {
    expect(nameFormatter({
      first_name: null,
      last_name: null,
      name_default: '',
    })).toEqual('')
  })

  describe('with middle name', () => {
    it('renders nothing for blank middle name', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: null,
        last_name: 'Preston',
      })).toEqual('Bill Preston')
    })

    it('renders middle name', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: 'S.',
        last_name: 'Preston',
      })).toEqual('Bill S. Preston')
    })
  })

  describe('with suffix', () => {
    it('renders nothing for blank suffix', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: 'S.',
        last_name: 'Preston',
        name_suffix: null,
      })).toEqual('Bill S. Preston')
    })

    it('renders suffix with comma', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: 'S.',
        last_name: 'Preston',
        name_suffix: 'esq',
      })).toEqual('Bill S. Preston, Esq')
    })

    it('renders suffix without comma for II, III, and IV', () => {
      ['ii', 'iii', 'iv'].map((suffix) => {
        expect(nameFormatter({
          first_name: 'Bill',
          middle_name: 'S.',
          last_name: 'Preston',
          name_suffix: suffix,
        })).toEqual(`Bill S. Preston ${suffix.toUpperCase()}`)
      })
    })

    it('renders name only if suffix_name is 0 or 1', () => {
      ['0', '1'].map((suffix) => {
        expect(nameFormatter({
          first_name: 'Bill',
          middle_name: 'S.',
          last_name: 'Preston',
          name_suffix: suffix,
        })).toEqual('Bill S. Preston')
      })
    })

    it('returns II for suffix name 2', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: 'S.',
        last_name: 'Preston',
        name_suffix: '2',
      })).toEqual('Bill S. Preston II')
    })

    it('returns III for suffix name 3', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: 'S.',
        last_name: 'Preston',
        name_suffix: '3',
      })).toEqual('Bill S. Preston III')
    })

    it('returns IV for suffix name 4', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        middle_name: 'S.',
        last_name: 'Preston',
        name_suffix: '4',
      })).toEqual('Bill S. Preston IV')
    })
  })

  describe('edge cases', () => {
    it('renders with a only middle name', () => {
      expect(nameFormatter({
        first_name: null,
        last_name: null,
        middle_name: 'S.',
        name_suffix: null,
      })).toEqual('Unknown S.')
    })

    it('renders with a only a suffix', () => {
      expect(nameFormatter({
        first_name: null,
        last_name: null,
        middle_name: null,
        name_suffix: 'esq',
      })).toEqual('Unknown Person')
    })

    it('renders with a only middle name and a suffix', () => {
      expect(nameFormatter({
        first_name: null,
        last_name: null,
        middle_name: 'S.',
        name_suffix: 'esq',
      })).toEqual('Unknown S., Esq')
    })

    it('renders with a only first name and middle name', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        last_name: null,
        middle_name: 'S.',
        name_suffix: null,
      })).toEqual('Bill S. (Unknown last name)')
    })

    it('renders with a only last name and middle name', () => {
      expect(nameFormatter({
        first_name: null,
        last_name: 'Preston',
        middle_name: 'S.',
        name_suffix: null,
      })).toEqual('(Unknown first name) S. Preston')
    })

    it('renders with a only first name and suffix', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        last_name: null,
        middle_name: null,
        name_suffix: 'esq',
      })).toEqual('Bill (Unknown last name), Esq')
    })

    it('renders with a only last name and suffix', () => {
      expect(nameFormatter({
        first_name: null,
        last_name: 'Preston',
        middle_name: null,
        name_suffix: 'esq',
      })).toEqual('(Unknown first name) Preston, Esq')
    })

    it('renders with a only first name, middle name, and suffix', () => {
      expect(nameFormatter({
        first_name: 'Bill',
        last_name: null,
        middle_name: 'S.',
        name_suffix: 'esq',
      })).toEqual('Bill S. (Unknown last name), Esq')
    })

    it('renders with a only last name, middle name, and suffix', () => {
      expect(nameFormatter({
        first_name: null,
        last_name: 'Preston',
        middle_name: 'S.',
        name_suffix: 'esq',
      })).toEqual('(Unknown first name) S. Preston, Esq')
    })
  })
})
