import {getSSNErrors} from 'utils/ssnValidator'

describe('ssnValidator', () => {
  describe('getSSNErrors', () => {
    it('must be 9 digits long', () => {
      expect(getSSNErrors('88756123'))
        .toEqual(['Social security number must be 9 digits long.'])
    })

    it('cannot begin with 9.', () => {
      expect(getSSNErrors('987561234'))
        .toEqual(['Social security number cannot begin with 9.'])
    })

    it('cannot begin with 666.', () => {
      expect(getSSNErrors('666561234'))
        .toEqual(['Social security number cannot begin with 666.'])
    })

    it('cannot contain all 0s in the first group', () => {
      expect(getSSNErrors('000561234'))
        .toEqual(['Social security number cannot contain all 0s in a group.'])
    })

    it('cannot contain all 0s in second group', () => {
      expect(getSSNErrors('768001234'))
        .toEqual(['Social security number cannot contain all 0s in a group.'])
    })

    it('cannot contain all 0s in third group', () => {
      expect(getSSNErrors('768560000'))
        .toEqual(['Social security number cannot contain all 0s in a group.'])
    })

    it('only shows one error message related to all 0s in a group', () => {
      expect(getSSNErrors('000000000'))
        .toEqual(['Social security number cannot contain all 0s in a group.'])
    })

    it('can have multiple errors at the same time', () => {
      expect(getSSNErrors('66600'))
        .toEqual([
          'Social security number must be 9 digits long.',
          'Social security number cannot begin with 666.',
          'Social security number cannot contain all 0s in a group.',
        ])
    })

    it('does not return an error message for a valid number', () => {
      expect(getSSNErrors('767561234')).toEqual([])
    })
  })
})
