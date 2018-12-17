import {fromJS, List} from 'immutable'
import {
  getFormattedPersonInformationSelector,
  getFormattedPersonWithErrorsSelector,
  getPersonFormattedPhoneNumbersSelector,
  getReadOnlyPersonFormattedAddressesSelector,
  getNamesRequiredSelector,
  getPersonAlertErrorMessageSelector,
  getErrorsSelector,
} from 'selectors/screening/personShowSelectors'
import * as matchers from 'jasmine-immutable-matchers'
import moment from 'moment'

describe('personShowSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getFormattedPersonInformationSelector', () => {
    it('returns a blank person when person does not exist', () => {
      const participants = [{id: '1', date_of_birth: '2014-01-15'}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '2')).toEqualImmutable(fromJS({
        legacySource: undefined,
        name: {value: 'Unknown Person', errors: [], required: false},
        CSECTypes: {value: List(), errors: []},
        csecStartedAt: {value: undefined, errors: []},
        csecEndedAt: {value: undefined, errors: []},
        gender: {value: undefined},
        roles: {value: [], errors: []},
        languages: undefined,
        dateOfBirth: {value: undefined},
        approximateAge: undefined,
        ssn: {value: '', errors: []},
        races: undefined,
        ethnicity: undefined,
        alertErrorMessage: undefined,
        showCSEC: false,
      }))
    })

    it('includes the legacy source for the given person', () => {
      const participants = [
        {id: '1', legacy_descriptor: {legacy_ui_id: '1-4', legacy_table_description: 'Client'}},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('legacySource'))
        .toEqual('Client ID 1-4 in CWS-CMS')
    })

    it('includes the csec details for the given person', () => {
      const participants = [
        {id: '1', csec: [{csec_code_id: '14', start_date: '1111-11-11'}]},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('csecStartedAt'))
        .toEqual(fromJS({
          value: '11/11/1111',
          errors: [],
        }))
    })

    it('does not include the csec details if not provided for the given person', () => {
      const participants = [
        {id: '1', csec: []},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('csecEndedAt'))
        .toEqual(fromJS({
          value: undefined,
          errors: [],
        }))
    })

    it('includes the display name for the given person', () => {
      const participants = [{id: '1', first_name: 'John', middle_name: 'Q', last_name: 'Public'}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('name'))
        .toEqual(fromJS({
          value: 'John Q Public',
          errors: [],
          required: false,
        })
        )
    })

    it('includes the gender for the given person', () => {
      const participants = [{id: '1', gender: 'intersex'}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').getIn(['gender', 'value']))
        .toEqual('Intersex')
    })

    it('includes the roles for the given person as is', () => {
      const participants = [{id: '1', roles: ['super-hero', 'anti-hero']}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').getIn(['roles', 'value']))
        .toEqualImmutable(fromJS(['super-hero', 'anti-hero']))
    })

    it('includes the formatted languages for the given person', () => {
      const participants = [{id: '1', languages: ['Javascript', 'Ruby']}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('languages'))
        .toEqual('Javascript (Primary), Ruby')
    })

    it('includes the formatted date of birth for the given person', () => {
      const participants = [{id: '1', date_of_birth: '2014-01-15'}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').getIn(['dateOfBirth', 'value'])).toEqual('01/15/2014')
    })

    it('does not include approximate age if person has a date of birth', () => {
      const participants = [{
        id: '1',
        date_of_birth: '2014-01-15',
        approximate_age: '9',
        approximate_age_units: 'dog years',
      }]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('approximateAge')).toEqual(undefined)
    })

    it('includes the approximate age for the given person', () => {
      const participants = [{id: '1', approximate_age: '9', approximate_age_units: 'dog years'}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('approximateAge')).toEqual('9 dog years')
    })

    it('includes the value and empty errors for the social security number for the given person', () => {
      const participants = [{id: '1', ssn: '987654321'}]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('ssn'))
        .toEqualImmutable(fromJS({
          value: '987-65-4321',
          errors: [],
        }))
    })

    it('includes the formatted races for the given person', () => {
      const participants = [
        {id: '1',
          races: [
            {race: 'White', race_detail: 'Romanian'},
            {race: 'Asian', race_detail: 'Chinese'},
            {race: 'Black or African American'},
          ]},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('races'))
        .toEqual('White - Romanian (primary), Asian - Chinese, Black or African American')
    })

    it('shows primary race when there is one race', () => {
      const participants = [
        {id: '1',
          races: [
            {race: 'White', race_detail: 'Romanian'},
          ]},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('races'))
        .toEqual('White - Romanian (primary)')
    })

    it('shows nothing when there is no race', () => {
      const participants = [
        {id: '1', races: []},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('races'))
        .toEqual('')
    })

    it('includes the formatted ethnicity for a person of hispanic/latino origin who has ethnicity details', () => {
      const participants = [
        {id: '1', ethnicity: {hispanic_latino_origin: 'Yes', ethnicity_detail: ['Mexican']}},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('ethnicity')).toEqual('Mexican - Yes')
    })

    it('includes the formatted ethnicity for a person of hispanic/latino origin but without ethnicity details', () => {
      const participants = [
        {id: '1', ethnicity: {hispanic_latino_origin: 'Unknown', ethnicity_detail: []}},
      ]
      const state = fromJS({participants})
      expect(getFormattedPersonInformationSelector(state, '1').get('ethnicity')).toEqual('Unknown')
    })
  })

  describe('getFormattedPersonWithErrorsSelector', () => {
    it('includes errors for ssn', () => {
      const participants = [{id: '1', ssn: '987654321'}]
      const state = fromJS({participants})
      expect(getFormattedPersonWithErrorsSelector(state, '1').get('ssn'))
        .toEqualImmutable(fromJS({
          value: '987-65-4321',
          errors: ['Social security number cannot begin with 9.'],
        }))
    })

    it('includes errors and required value for name', () => {
      const participants = [{
        id: '1',
        first_name: null,
        middle_name: 'Q',
        last_name: 'Public',
        roles: ['Victim'],
      }]
      const state = fromJS({participants})
      expect(getFormattedPersonWithErrorsSelector(state, '1').get('name'))
        .toEqualImmutable(fromJS({
          value: '(Unknown first name) Q Public',
          errors: ['Please enter a first name.'],
          required: true,
        }))
    })

    it('includes errors for gender', () => {
      const participants = [{
        id: '1',
        first_name: 'John',
        middle_name: 'Q',
        last_name: 'Public',
        roles: ['Victim'],
      }]
      const state = fromJS({participants})
      expect(getFormattedPersonWithErrorsSelector(state, '1').get('gender'))
        .toEqualImmutable(fromJS({
          value: undefined,
          errors: ['Please select a Sex at Birth.'],
        }))
    })
    it('includes errors for dateOfBirth', () => {
      const participants = [{
        id: '1',
        first_name: 'John',
        middle_name: 'Q',
        last_name: 'Public',
        roles: ['Victim'],
        date_of_birth: moment().add(1, 'days').toISOString(),
      }]
      const state = fromJS({participants})
      expect(getFormattedPersonWithErrorsSelector(state, '1').getIn(['dateOfBirth', 'errors']))
        .toEqualImmutable(fromJS(['Date of Birth should not be in the future.']))
    })
  })

  describe('getPersonFormattedPhoneNumbersSelector', () => {
    it('returns info for the person with the passed id', () => {
      const people = [
        {id: '1', phone_numbers: [{type: 'Home'}]},
        {id: '2', phone_numbers: [{type: 'Cell'}]},
      ]
      const state = fromJS({participants: people})
      expect(getPersonFormattedPhoneNumbersSelector(state, '1').first().get('type'))
        .toEqual('Home')
    })

    it('returns an empty array if no phone numbers exists for the person', () => {
      const people = [{id: '1'}]
      const state = fromJS({participants: people})
      expect(getPersonFormattedPhoneNumbersSelector(state, '1')).toEqualImmutable(List())
    })

    it('returns a formatted phone number for number', () => {
      const people = [{id: '1', phone_numbers: [{number: '0123456789'}]}]
      const state = fromJS({participants: people})
      expect(getPersonFormattedPhoneNumbersSelector(state, '1').first().get('number'))
        .toEqual('(012) 345-6789')
    })

    it('returns the type for a number', () => {
      const people = [{id: '1', phone_numbers: [{type: 'Home'}]}]
      const state = fromJS({participants: people})
      expect(getPersonFormattedPhoneNumbersSelector(state, '1').first().get('type'))
        .toEqual('Home')
    })
  })

  describe('getReadOnlyPersonFormattedAddressesSelector', () => {
    it('returns info for the person with the passed id', () => {
      const people = [
        {id: '1', addresses: [{type: '32', legacy_descriptor: {legacy_id: '23'}}, {type: 'Cell'}]},
        {id: '2', addresses: [{type: 'Cell', legacy_descriptor: {legacy_id: '33'}}]},
      ]
      const state = fromJS({participants: people})
      expect(getReadOnlyPersonFormattedAddressesSelector(state, '1').size).toEqual(1)
    })
  })

  describe('getNamesRequiredSelector', () => {
    it('returns true if roles includes Victim', () => {
      const people = [{id: '1', roles: ['Victim', 'other role']}]
      const state = fromJS({participants: people})
      expect(getNamesRequiredSelector(state, '1')).toEqual(true)
    })
  })

  describe('getPersonAlertErrorMessageSelector', () => {
    it('returns alert if roles include Victim and firstName is empty', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        last_name: 'Smith'}]
      const state = fromJS({participants: people})
      expect(getPersonAlertErrorMessageSelector(state, '1')).toEqual(
        'Alleged victims must be identified with a name, even Doe or Unknown, and must be under the age of 18')
    })

    it('returns alert if roles include Victim and lastName is empty', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        first_name: 'John'}]
      const state = fromJS({participants: people})
      expect(getPersonAlertErrorMessageSelector(state, '1')).toEqual(
        'Alleged victims must be identified with a name, even Doe or Unknown, and must be under the age of 18')
    })

    it('returns undefined if roles include Victim and lastName and firstName is not empty', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        first_name: 'John',
        last_name: 'Smoth'}]
      const state = fromJS({participants: people})
      expect(getPersonAlertErrorMessageSelector(state, '1')).toEqual(undefined)
    })
  })
  describe('getErrorsSelector', () => {
    describe('zip', () => {
      it('must be 5 digits long', () => {
        const people = [{id: 'one', addresses: [{zip: '1234'}]}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('addressZip'))
          .toBeImmutable(List([['zip code should be 5 digits']]))
      })
      it('should return empty when zip is 5 digits', () => {
        const people = [{id: 'one', addresses: [{zip: '12345'}]}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('addressZip'))
          .toEqualImmutable(List([]))
      })
      it('should return empty errors when there is complete address with missing zip', () => {
        const people = [{id: 'one', addresses: [{zip: null}]}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('addressZip'))
          .toEqualImmutable(List([]))
      })
    })
    describe('social security number', () => {
      it('must be 9 digits long', () => {
        const people = [{id: 'one', ssn: '88756123'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number must be 9 digits long.']))
      })
      it('does not count hyphens as part of the number length', () => {
        const people = [{id: 'one', ssn: '887-56-123'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number must be 9 digits long.']))
      })

      it('does not count underscores as part of the number length', () => {
        // our masked input adds underscores as part of the placeholder
        const people = [{id: 'one', ssn: '8__-__-____'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number must be 9 digits long.']))
      })

      it('cannot begin with 9.', () => {
        const people = [{id: 'one', ssn: '987561234'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number cannot begin with 9.']))
      })

      it('cannot begin with 666.', () => {
        const people = [{id: 'one', ssn: '666561234'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number cannot begin with 666.']))
      })

      it('cannot contain all 0s in the first group', () => {
        const people = [{id: 'one', ssn: '000-56-1234'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number cannot contain all 0s in a group.']))
      })

      it('cannot contain all 0s in second group', () => {
        const people = [{id: 'one', ssn: '768-00-1234'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number cannot contain all 0s in a group.']))
      })

      it('cannot contain all 0s in third group', () => {
        const people = [{id: 'one', ssn: '768-56-0000'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number cannot contain all 0s in a group.']))
      })

      it('only shows one error message related to all 0s in a group', () => {
        const people = [{id: 'one', ssn: '000-00-0000'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List(['Social security number cannot contain all 0s in a group.']))
      })

      it('can have multiple errors at the same time', () => {
        const people = [{id: 'one', ssn: '666-00-'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List([
            'Social security number must be 9 digits long.',
            'Social security number cannot begin with 666.',
            'Social security number cannot contain all 0s in a group.',
          ]))
      })

      it('does not return an error message for a valid number', () => {
        const people = [{id: 'one', ssn: '767561234'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List())
      })

      it('does not return an error message for a valid number that contains hyphens', () => {
        const people = [{id: 'one', ssn: '323-56-4321'}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List())
      })

      it('does not return an error message if the current value is null', () => {
        const people = [{id: 'one', ssn: null}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('ssn'))
          .toEqualImmutable(List())
      })
    })

    describe('gender', () => {
      it('is required if role is Victim', () => {
        const people = [{id: 'one', gender: '', roles: ['Victim']}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('gender').size)
          .toEqual(1)
      })

      it('is required if role is Perpetrator', () => {
        const people = [{id: 'one', gender: '', roles: ['Perpetrator']}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('gender').size)
          .toEqual(1)
      })

      it('has no error if it is provided', () => {
        const people = [{id: 'one', gender: 'male', roles: ['Victim']}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('gender'))
          .toEqualImmutable(List())
      })
    })

    describe('dateOfBirth', () => {
      it('returns no error if date is current or in the past', () => {
        const today = moment().toISOString()
        const people = [{id: 'one', date_of_birth: today}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('dateOfBirth'))
          .toEqualImmutable(List())
      })

      it('returns an error if date is in the future', () => {
        const tomorrow = moment().add(1, 'days').toISOString()
        const people = [{id: 'one', date_of_birth: tomorrow}]
        const state = fromJS({participants: people})
        expect(getErrorsSelector(state, 'one').get('dateOfBirth'))
          .toEqualImmutable(List(['Date of Birth should not be in the future.']))
      })
    })
    describe('csec types', () => {
      it('returns no error if there is a csec type', () => {
        const participant = {id: 'one', csec: [{csec_code_id: '6867'}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecTypes'))
          .toEqualImmutable(List([]))
      })
      it('returns error if there is no csec type', () => {
        const participant = {id: 'one', csec: []}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecTypes'))
          .toEqualImmutable(List(['CSEC type must be selected.']))
      })
    })

    describe('csec started at', () => {
      it('returns no error if there is a csec start date', () => {
        const startDate = moment().toISOString()
        const participant = {id: 'one', csec: [{start_date: startDate}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecStartedAt'))
          .toEqualImmutable(List([]))
      })
      it('returns error if there no csec start date', () => {
        const participant = {id: 'one', csec: [{start_date: undefined}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecStartedAt'))
          .toEqualImmutable(List(['Start date must be entered.']))
      })
      it('returns error csec start date is in the future', () => {
        const futureDate = moment().add(1, 'days').toISOString()
        const participant = {id: 'one', csec: [{start_date: futureDate}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecStartedAt'))
          .toEqualImmutable(List(['The start date and time cannot be in the future.']))
      })
      it('returns error csec start date is after end date', () => {
        const futureDate = '2018-10-01T21:09:37.104Z'
        const todayDate = '2018-09-30T21:09:37.104Z'
        const participant = {id: 'one', csec: [{start_date: futureDate, end_date: todayDate}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecStartedAt'))
          .toEqualImmutable(List(['The start date and time must be before the end date and time.']))
      })
    })

    describe('csec ended at', () => {
      it('returns no error if there no csec start date', () => {
        const participant = {id: 'one', csec: [{end_date: undefined}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecEndedAt'))
          .toEqualImmutable(List([]))
      })

      it('end date cannot be in future', () => {
        const futureDate = moment().add(1, 'days').toISOString()
        const participant = {id: 'one', csec: [{end_date: futureDate}]}
        const person = {id: 'one', roles: {value: ['Victim']}}
        const state = fromJS({screeningInformationForm: {report_type: {value: 'csec'}}, participants: [participant], peopleForm: {one: person}})
        expect(getErrorsSelector(state, 'one').get('csecEndedAt'))
          .toEqualImmutable(List(['The end date and time cannot be in the future.']))
      })
    })

    describe('roles in getErrorsSelector', () => {
      it('returns roles error if role includes Victim and date of birth or approximate age is empty', () => {
        const people = [{id: '1', roles: ['Victim']}]
        const state = fromJS({screeningInformationForm: {started_at: {value: '2018-01-31T00:24:22.007Z'}}, participants: people})
        expect(getErrorsSelector(state, '1').get('roles').first()).toEqual('Alleged victims must be under 18 years old.')
      })

      it('does not return roles error if role includes Victim and date of birth is under 18', () => {
        const people = [{id: '1', date_of_birth: '12/24/2001', roles: ['Victim']}]
        const state = fromJS({screeningInformationForm: {started_at: {value: '2018-01-31T00:24:22.007Z'}}, participants: people})
        expect(getErrorsSelector(state, '1').get('roles')).toEqualImmutable(List())
      })

      it('does not return roles error if role includes Victim and date of birth is in the future', () => {
        const people = [{id: '1', date_of_birth: '2/24/2018', roles: ['Victim']}]
        const state = fromJS({screeningInformationForm: {started_at: {value: '2018-01-31T00:24:22.007Z'}}, participants: people})
        expect(getErrorsSelector(state, '1').get('roles')).toEqualImmutable(List())
      })

      it('returns roles error if role includes Victim and date of birth is over 18', () => {
        const people = [{id: '1', date_of_birth: '12/24/1998', roles: ['Victim']}]
        const state = fromJS({screeningInformationForm: {started_at: {value: '2018-01-31T00:24:22.007Z'}}, participants: people})
        expect(getErrorsSelector(state, '1').get('roles')).toEqualImmutable(List(['Alleged victims must be under 18 years old.']))
      })

      it('does not return roles error if role includes Victim and approximate age with units is under 18', () => {
        const people = [
          {id: '1', approximate_age: '17', approximate_age_units: 'years', roles: ['Victim']},
          {id: '2', approximate_age: '214', approximate_age_units: 'months', roles: ['Victim']},
          {id: '3', approximate_age: '923', approximate_age_units: 'weeks', roles: ['Victim']},
          {id: '4', approximate_age: '6522', approximate_age_units: 'days', roles: ['Victim']},
        ]
        const state = fromJS({screeningInformationForm: {started_at: {value: '2018-01-31T00:24:22.007Z'}}, participants: people})
        expect(getErrorsSelector(state, '1').get('roles')).toEqualImmutable(List([]))
        expect(getErrorsSelector(state, '2').get('roles')).toEqualImmutable(List([]))
        expect(getErrorsSelector(state, '3').get('roles')).toEqualImmutable(List([]))
        expect(getErrorsSelector(state, '4').get('roles')).toEqualImmutable(List([]))
      })

      it('returns roles error if role includes Victim and approximate age with units is under 18', () => {
        const people = [
          {id: '1', approximate_age: '18', approximate_age_units: 'years', roles: ['Victim']},
          {id: '2', approximate_age: '217', approximate_age_units: 'months', roles: ['Victim']},
          {id: '3', approximate_age: '940', approximate_age_units: 'weeks', roles: ['Victim']},
          {id: '4', approximate_age: '6575', approximate_age_units: 'days', roles: ['Victim']},
        ]
        const state = fromJS({screeningInformationForm: {started_at: {value: '2018-01-31T00:24:22.007Z'}}, participants: people})
        expect(getErrorsSelector(state, '1').get('roles')).toEqualImmutable(List(['Alleged victims must be under 18 years old.']))
        expect(getErrorsSelector(state, '2').get('roles')).toEqualImmutable(List(['Alleged victims must be under 18 years old.']))
        expect(getErrorsSelector(state, '3').get('roles')).toEqualImmutable(List(['Alleged victims must be under 18 years old.']))
        expect(getErrorsSelector(state, '4').get('roles')).toEqualImmutable(List(['Alleged victims must be under 18 years old.']))
      })
    })

    it('returns last name error if last name is empty and role includes Victim', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        first_name: 'John'}]
      const state = fromJS({participants: people})
      expect(getErrorsSelector(state, '1').get('name').first()).toEqual('Please enter a last name.')
    })

    it('returns first name error if first name is empty and role includes Victim', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        last_name: 'Smith'}]
      const state = fromJS({participants: people})
      expect(getErrorsSelector(state, '1').get('name').first()).toEqual('Please enter a first name.')
    })

    it('returns last name error if last name is empty and role includes Perpetrator', () => {
      const people = [{id: '1',
        roles: ['Perpetrator', 'other role'],
        first_name: 'John'}]
      const state = fromJS({participants: people})
      expect(getErrorsSelector(state, '1').get('name').first()).toEqual('Please enter a last name.')
    })

    it('returns first name error if first name is empty and role includes Perpetrator', () => {
      const people = [{id: '1',
        roles: ['Perpetrator', 'other role'],
        last_name: 'Smith'}]
      const state = fromJS({participants: people})
      expect(getErrorsSelector(state, '1').get('name').first()).toEqual('Please enter a first name.')
    })

    it('returns undefined if first name and last name is not empty and role includes Victim', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        last_name: 'Smith',
        first_name: 'John'}]
      const state = fromJS({participants: people})
      expect(getErrorsSelector(state, '1').get('name').first()).toEqual(undefined)
    })

    it('returns first name error and last name error if first name and last name are empty and role includes Victim', () => {
      const people = [{id: '1',
        roles: ['Victim', 'other role'],
        last_name: '',
        first_name: ''}]
      const state = fromJS({participants: people})
      expect(getErrorsSelector(state, '1').get('name').includes('Please enter a first name.')).toEqual(true)
      expect(getErrorsSelector(state, '1').get('name').includes('Please enter a last name.')).toEqual(true)
    })
  })
})
