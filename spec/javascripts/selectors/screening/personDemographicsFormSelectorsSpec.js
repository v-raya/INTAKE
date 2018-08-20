import {fromJS} from 'immutable'
import {
  getIsApproximateAgeDisabledSelector,
  getPersonDemographicsSelector,
  isGenderRequired,
} from 'selectors/screening/personDemographicsFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('personDemographicFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getIsApproximateAgeDisabledSelector', () => {
    it('is set to false if the given person does not have a date of birth', () => {
      const peopleForm = {1: {date_of_birth: {value: null}}}
      const state = fromJS({peopleForm})
      expect(getIsApproximateAgeDisabledSelector(state, '1')).toBe(false)
    })

    it('is set to true if the given person has a date of birth', () => {
      const peopleForm = {1: {date_of_birth: {value: '13/0/-514'}}}
      const state = fromJS({peopleForm})
      expect(getIsApproximateAgeDisabledSelector(state, '1')).toBe(true)
    })
  })

  describe('getPersonDemographicsSelector', () => {
    it('returns a blank person when person does not exist', () => {
      const peopleForm = {1: {}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '2').toJS()).toEqual({
        approximateAge: '',
        approximateAgeUnit: '',
        dateOfBirth: '',
        dateOfBirthIsRequired: false,
        gender: '',
        genderIsRequired: false,
        genderError: undefined,
        languages: [],
      })
    })

    it('includes the approximate age for the given person', () => {
      const peopleForm = {1: {approximate_age: {value: '1'}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('approximateAge')).toEqual('1')
    })

    it('includes the approximate age unit for the given person', () => {
      const peopleForm = {1: {approximate_age_units: {value: 'year'}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('approximateAgeUnit')).toEqual('year')
    })

    it('includes the date of birth for the given person', () => {
      const peopleForm = {1: {date_of_birth: {value: '13/0/-514'}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('dateOfBirth')).toEqual('13/0/-514')
    })

    it('includes the gender for the given person', () => {
      const peopleForm = {1: {gender: {value: 'known'}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('gender')).toEqual('known')
    })

    it('includes a gender error if required', () => {
      const peopleForm = {1: {gender: {value: ''}, roles: {value: ['Victim']}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('genderError')).toBeDefined()
    })

    it('includes no gender error if not required', () => {
      const peopleForm = {1: {gender: {value: ''}, roles: {value: ['']}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('genderError')).toBeUndefined()
    })

    it('includes the languages for the given person', () => {
      const peopleForm = {1: {languages: {value: ['Ω', 'ß']}}}
      const state = fromJS({peopleForm})
      expect(getPersonDemographicsSelector(state, '1').get('languages'))
        .toEqualImmutable(fromJS(['Ω', 'ß']))
    })
  })

  describe('isGenderRequired', () => {
    it('is true when role is Victim', () => {
      const roles = ['Victim']
      expect(isGenderRequired(roles)).toEqual(true)
    })
    it('is true when role is Perpetrator', () => {
      const roles = ['Perpetrator']
      expect(isGenderRequired(roles)).toEqual(true)
    })
    it('is false when role is not Victim nor Perpetrator', () => {
      const roles = ['Mandated Reporter']
      expect(isGenderRequired(roles)).toEqual(false)
    })
  })
})
