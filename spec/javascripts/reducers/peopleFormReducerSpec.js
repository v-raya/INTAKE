import * as matchers from 'jasmine-immutable-matchers'
import {fetchScreeningSuccess, fetchScreeningFailure} from 'actions/screeningActions'
import {createPersonSuccess, createPersonFailure, updatePersonSuccess} from 'actions/personCardActions'
import {
  setField,
  touchField,
  touchAllFields,
  addAddress,
  deleteAddress,
  addPhone,
  deletePhone,
} from 'actions/peopleFormActions'
import peopleFormReducer from 'reducers/peopleFormReducer'
import {Map, fromJS} from 'immutable'

describe('peopleFormReducer', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on fetch screening', () => {
    it('populates the people form on success', () => {
      const action = fetchScreeningSuccess({
        participants: [{
          id: 'participant_one',
          addresses: [{
            id: 'ABC123',
            street_address: '1234 Some Lane',
            city: 'Somewhere',
            state: 'CA',
            zip: '55555',
            type: 'Home',
            legacy_id: 'xxeddw',
            legacy_descriptor: 'address legacy descriptor participant one',
          }],
          approximate_age: '2',
          approximate_age_units: 'days',
          csec_types: ['At Risk'],
          csec_started_at: '1/1/1111',
          csec_ended_at: '1/1/1111',
          date_of_birth: '2/2/2222',
          gender: 'male',
          languages: ['English'],
          roles: ['a', 'b'],
          legacy_descriptor: 'legacy descriptor one',
          first_name: 'first name one',
          middle_name: 'middle name one',
          last_name: 'last name one',
          name_suffix: 'name suffix one',
          phone_numbers: [],
          ssn: 'ssn one',
          sensitive: true,
          sealed: true,
          races: [
            {race: 'race_1', race_detail: 'race_detail_1'},
            {race: 'race_2', race_detail: 'race_detail_2'},
          ],
          ethnicity: {
            ethnicity_detail: ['Mexican'],
            hispanic_latino_origin: 'Yes',
          },
        }, {
          id: 'participant_two',
          addresses: [{
            id: 'ABC123',
            street_address: '1234 Some Lane',
            city: 'Somewhere',
            state: 'CA',
            zip: '55555',
            type: 'Home',
          }],
          roles: ['c'],
          legacy_descriptor: 'legacy descriptor two',
          approximate_age: '3',
          approximate_age_units: 'months',
          csec_types: ['Risk'],
          csec_started_at: '3/3/3333',
          csec_ended_at: '3/3/3333',
          date_of_birth: '3/3/3333',
          gender: '',
          languages: [],
          first_name: 'first name two',
          middle_name: 'middle name two',
          last_name: 'last name two',
          name_suffix: 'name suffix two',
          phone_numbers: [{id: 'DEF456', number: '1234567890', type: 'Home'}],
          ssn: 'ssn two',
          sensitive: false,
          sealed: false,
          races: [],
          ethnicity: {
            ethnicity_detail: [],
            hispanic_latino_origin: null,
          },
        }],
      })
      expect(peopleFormReducer(Map(), action)).toEqualImmutable(
        fromJS({
          participant_one: {
            roles: {value: ['a', 'b'], touched: false},
            addresses: [],
            approximate_age: {value: '2'},
            approximate_age_units: {value: 'days'},
            csec_types: {value: ['At Risk'], touched: false},
            csec_started_at: {value: '1/1/1111', touched: false},
            csec_ended_at: {value: '1/1/1111', touched: false},
            date_of_birth: {value: '2/2/2222'},
            gender: {value: 'male'},
            languages: {value: ['English']},
            legacy_descriptor: {value: 'legacy descriptor one'},
            first_name: {value: 'first name one', touched: false},
            middle_name: {value: 'middle name one'},
            last_name: {value: 'last name one', touched: false},
            name_suffix: {value: 'name suffix one'},
            phone_numbers: [],
            ssn: {value: 'ssn one', touched: false},
            sensitive: {value: true},
            sealed: {value: true},
            races: {
              race_1: {value: true},
              race_2: {value: true},
            },
            race_details: {
              race_1: {value: 'race_detail_1'},
              race_2: {value: 'race_detail_2'},
            },
            ethnicity: {
              ethnicity_detail: {value: ['Mexican']},
              hispanic_latino_origin: {value: 'Yes'},
            },
          },
          participant_two: {
            roles: {value: ['c'], touched: false},
            addresses: [{
              id: 'ABC123',
              street: {value: '1234 Some Lane'},
              city: {value: 'Somewhere'},
              state: {value: 'CA'},
              zip: {value: '55555'},
              type: {value: 'Home'},
              legacy_id: {value: undefined},
              legacy_descriptor: {value: undefined},
            }],
            approximate_age: {value: '3'},
            approximate_age_units: {value: 'months'},
            csec_types: {value: ['Risk'], touched: false},
            csec_started_at: {value: '3/3/3333', touched: false},
            csec_ended_at: {value: '3/3/3333', touched: false},
            date_of_birth: {value: '3/3/3333'},
            gender: {value: ''},
            languages: {value: []},
            legacy_descriptor: {value: 'legacy descriptor two'},
            first_name: {value: 'first name two', touched: false},
            middle_name: {value: 'middle name two'},
            last_name: {value: 'last name two', touched: false},
            name_suffix: {value: 'name suffix two'},
            phone_numbers: [{
              id: 'DEF456',
              number: {value: '1234567890'},
              type: {value: 'Home'},
            }],
            ssn: {value: 'ssn two', touched: false},
            sensitive: {value: false},
            sealed: {value: false},
            races: {},
            race_details: {},
            ethnicity: {
              ethnicity_detail: {value: []},
              hispanic_latino_origin: {value: null},
            },
          },
        })
      )
    })
    it('returns the last state on failure', () => {
      const lastState = fromJS({
        participant_one: {
          roles: {value: ['a', 'b'], touched: false},
          legacy_descriptor: {value: 'legacy descriptor one'},
        },
        participant_two: {
          roles: {value: ['c'], touched: true},
          legacy_descriptor: {value: 'legacy descriptor two'},
        },
      })
      const action = fetchScreeningFailure()
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          participant_one: {
            roles: {value: ['a', 'b'], touched: false},
            legacy_descriptor: {value: 'legacy descriptor one'},
          },
          participant_two: {
            roles: {value: ['c'], touched: true},
            legacy_descriptor: {value: 'legacy descriptor two'},
          },
        })
      )
    })
  })
  describe('on set person form field', () => {
    it('returns the updated form state', () => {
      const lastState = fromJS({
        participant_one: {
          roles: {value: [], touched: false},
        },
        participant_two: {
          roles: {value: ['c'], touched: false},
        },
      })
      const action = setField('participant_one', ['roles'], ['a', 'b'])
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          participant_one: {
            roles: {value: ['a', 'b'], touched: false},
          },
          participant_two: {
            roles: {value: ['c'], touched: false},
          },
        })
      )
    })
  })

  describe('on touch person form field', () => {
    it('returns the updated form state', () => {
      const lastState = fromJS({
        participant_one: {
          ssn: {touched: false},
        },
        participant_two: {
          ssn: {touched: false},
        },
      })
      const action = touchField('participant_one', ['ssn'])
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          participant_one: {
            ssn: {touched: true},
          },
          participant_two: {
            ssn: {touched: false},
          },
        })
      )
    })
  })

  describe('on touch all person form fields', () => {
    it('returns people form with the fields updated to touched', () => {
      const state = fromJS({
        participant_one: {
          roles: {touched: false},
          first_name: {touched: false},
          last_name: {touched: false},
          ssn: {touched: false},
          csec_types: {touched: false},
          csec_started_at: {touched: false},
          csec_ended_at: {touched: false},
        },
        participant_two: {
          roles: {touched: false},
          first_name: {touched: false},
          last_name: {touched: false},
          ssn: {touched: false},
          csec_types: {touched: false},
          csec_started_at: {touched: false},
          csec_ended_at: {touched: false},
        },
      })
      const action = touchAllFields('participant_one')
      expect(peopleFormReducer(state, action)).toEqualImmutable(fromJS({
        participant_one: {
          roles: {touched: true},
          first_name: {touched: true},
          last_name: {touched: true},
          ssn: {touched: true},
          csec_types: {touched: true},
          csec_started_at: {touched: true},
          csec_ended_at: {touched: true},
        },
        participant_two: {
          roles: {touched: false},
          first_name: {touched: false},
          last_name: {touched: false},
          ssn: {touched: false},
          csec_types: {touched: false},
          csec_started_at: {touched: false},
          csec_ended_at: {touched: false},
        },
      }))
    })
  })

  describe('on addPhone', () => {
    it('adds a new empty phone item for the given person id', () => {
      const lastState = fromJS({
        person_one: {phone_numbers: []},
        person_two: {phone_numbers: []},
      })
      const action = addPhone('person_one')
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          person_one: {phone_numbers: [{id: null, number: {value: null}, type: {value: null}}]},
          person_two: {phone_numbers: []},
        })
      )
    })
  })

  describe('on deletePhone', () => {
    it('deletes the phone item for the given person id and index', () => {
      const lastState = fromJS({
        person_one: {phone_numbers: [{id: '123', number: {value: '1234567890'}, type: {value: 'Home'}}]},
        person_two: {phone_numbers: [{id: 'ABC', number: {value: '0987654321'}, type: {value: 'Cell'}}]},
      })
      const action = deletePhone('person_one', 0)
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          person_one: {phone_numbers: []},
          person_two: {phone_numbers: [{id: 'ABC', number: {value: '0987654321'}, type: {value: 'Cell'}}]},
        })
      )
    })
  })

  describe('on CREATE_PERSON_COMPLETE', () => {
    const lastState = fromJS({
      participant_one: {
        approximate_age: {value: '2'},
        approximate_age_units: {value: 'days'},
        date_of_birth: {value: '2/2/2222'},
        gender: {value: 'male'},
        languages: {value: ['English']},
        roles: {value: ['a', 'b'], touched: true},
        legacy_descriptor: {value: 'legacy descriptor one'},
        first_name: {value: 'first name one'},
        middle_name: {value: 'middle name one'},
        last_name: {value: 'last name one'},
        name_suffix: {value: 'name suffix one'},
        ssn: {value: 'ssn one', touched: true},
        sensitive: {value: true},
        sealed: {value: true},
        phone_numbers: [],
        addresses: [],
        races: {},
        race_details: {},
        ethnicity: {
          hispanic_latino_origin: 'Yes',
          ethnicity_detail: ['Mexican'],
        },
      },
    })
    it('returns people form with the added person on success', () => {
      const newPerson = {
        approximate_age: '3',
        approximate_age_units: 'months',
        csec_types: ['At Risk'],
        csec_started_at: '1/1/1111',
        csec_ended_at: '1/1/1111',
        date_of_birth: '3/3/3333',
        gender: '',
        languages: [],
        id: 'participant_two',
        roles: ['c'],
        legacy_descriptor: 'legacy descriptor two',
        first_name: 'first name two',
        middle_name: 'middle name two',
        last_name: 'last name two',
        name_suffix: 'name suffix two',
        ssn: 'ssn two',
        sensitive: false,
        sealed: false,
        phone_numbers: [{id: 'DEF456', number: '1234567890', type: 'Home'}],
        addresses: [{
          id: 'ABC123',
          street_address: '1234 Some Lane',
          city: 'Somewhere',
          state: 'CA',
          zip: '55555',
          type: 'Home',
          legacy_id: '65TT6lc0Qc',
          legacy_source_table: null,
          legacy_descriptor: null,
        }],
        races: [],
        ethnicity: {
          hispanic_latino_origin: null,
          ethnicity_detail: [],
        },
      }
      const action = createPersonSuccess(newPerson)
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(fromJS({
        participant_one: {
          approximate_age: {value: '2'},
          approximate_age_units: {value: 'days'},
          date_of_birth: {value: '2/2/2222'},
          gender: {value: 'male'},
          languages: {value: ['English']},
          roles: {value: ['a', 'b'], touched: true},
          legacy_descriptor: {value: 'legacy descriptor one'},
          first_name: {value: 'first name one'},
          middle_name: {value: 'middle name one'},
          last_name: {value: 'last name one'},
          name_suffix: {value: 'name suffix one'},
          ssn: {value: 'ssn one', touched: true},
          sensitive: {value: true},
          sealed: {value: true},
          phone_numbers: [],
          addresses: [],
          races: {},
          race_details: {},
          ethnicity: {
            hispanic_latino_origin: 'Yes',
            ethnicity_detail: ['Mexican'],
          },
        },
        participant_two: {
          approximate_age: {value: '3'},
          approximate_age_units: {value: 'months'},
          csec_types: {value: ['At Risk'], touched: false},
          csec_started_at: {value: '1/1/1111', touched: false},
          csec_ended_at: {value: '1/1/1111', touched: false},
          date_of_birth: {value: '3/3/3333'},
          gender: {value: ''},
          languages: {value: []},
          roles: {value: ['c'], touched: false},
          legacy_descriptor: {value: 'legacy descriptor two'},
          first_name: {value: 'first name two', touched: false},
          middle_name: {value: 'middle name two'},
          last_name: {value: 'last name two', touched: false},
          name_suffix: {value: 'name suffix two'},
          ssn: {value: 'ssn two', touched: false},
          sensitive: {value: false},
          sealed: {value: false},
          phone_numbers: [{
            id: 'DEF456',
            number: {value: '1234567890'},
            type: {value: 'Home'},
          }],
          addresses: [],
          races: {},
          race_details: {},
          ethnicity: {
            hispanic_latino_origin: {value: null},
            ethnicity_detail: {value: []},
          },
        },
      }))
    })
    it('returns the last person form state on failure', () => {
      const action = createPersonFailure()
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(lastState)
    })
  })

  describe('on UPDATE_PERSON_COMPLETE', () => {
    const lastState = fromJS({
      participant_one: {
        approximate_age: {value: '19'},
        approximate_age_units: {value: 'years'},
        csec_types: {value: [], touched: true},
        csec_started_at: {value: '1/1/1111', touched: true},
        csec_ended_at: {value: '1/1/1111', touched: true},
        date_of_birth: {value: '9/9/1999'},
        gender: {value: 'male'},
        languages: {value: ['English']},
        roles: {value: ['c'], touched: true},
        legacy_descriptor: {value: 'legacy descriptor one'},
        first_name: {value: 'first name one', touched: true},
        middle_name: {value: 'middle name one'},
        last_name: {value: 'last name one', touched: true},
        name_suffix: {value: 'name suffix one'},
        ssn: {value: 'ssn one', touched: true},
        sensitive: {value: false},
        sealed: {value: false},
        phone_numbers: [],
        addresses: [],
        races: [],
        race_details: {},
        ethnicity: {
          hispanic_latino_origin: 'Yes',
          ethnicity_detail: ['Mexican'],
        },
      },
    })
    it('returns people form with the added person on success', () => {
      const modified_person = {
        approximate_age: '19',
        approximate_age_units: 'years',
        csec_types: ['At Risk'],
        csec_started_at: '1/1/1111',
        csec_ended_at: '1/1/1111',
        date_of_birth: '9/9/1999',
        gender: 'male',
        languages: ['English'],
        id: 'participant_one',
        roles: ['c'],
        legacy_descriptor: 'legacy descriptor one',
        first_name: 'first name two',
        middle_name: 'middle name two',
        last_name: 'last name two',
        name_suffix: 'name suffix two',
        ssn: 'ssn two',
        sensitive: false,
        sealed: false,
        phone_numbers: [],
        addresses: [{
          id: 'ABC123',
          street_address: '1234 Some Lane',
          city: 'Somewhere',
          state: 'CA',
          zip: '55555',
          type: 'Home',
          legacy_descriptor: 'address legacy descriptor',
        }],
        races: [],
        race_details: {},
        ethnicity: {
          hispanic_latino_origin: 'Yes',
          ethnicity_detail: ['Mexican'],
        },
      }
      const action = updatePersonSuccess(modified_person)
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(fromJS({
        participant_one: {
          approximate_age: {value: '19'},
          approximate_age_units: {value: 'years'},
          csec_types: {value: ['At Risk'], touched: true},
          csec_started_at: {value: '1/1/1111', touched: true},
          csec_ended_at: {value: '1/1/1111', touched: true},
          date_of_birth: {value: '9/9/1999'},
          gender: {value: 'male'},
          languages: {value: ['English']},
          roles: {value: ['c'], touched: true},
          legacy_descriptor: {value: 'legacy descriptor one'},
          first_name: {value: 'first name two', touched: true},
          middle_name: {value: 'middle name two'},
          last_name: {value: 'last name two', touched: true},
          name_suffix: {value: 'name suffix two'},
          ssn: {value: 'ssn two', touched: true},
          sensitive: {value: false},
          sealed: {value: false},
          phone_numbers: [],
          addresses: [{
            id: 'ABC123',
            street: {value: '1234 Some Lane'},
            city: {value: 'Somewhere'},
            state: {value: 'CA'},
            zip: {value: '55555'},
            type: {value: 'Home'},
            legacy_id: {value: undefined},
            legacy_descriptor: {value: 'address legacy descriptor'},
          }],
          races: {},
          race_details: {},
          ethnicity: {
            hispanic_latino_origin: {value: 'Yes'},
            ethnicity_detail: {value: ['Mexican']},
          },
        },
      }))
    })
  })

  describe('on addAddress', () => {
    it('adds a new empty address item for the given person id', () => {
      const lastState = fromJS({
        person_one: {addresses: []},
        person_two: {addresses: []},
      })
      const action = addAddress('person_one')
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          person_one: {addresses: [{
            id: null,
            street: {value: null},
            city: {value: null},
            state: {value: null},
            zip: {value: null},
            type: {value: null},
          }]},
          person_two: {addresses: []},
        })
      )
    })
  })

  describe('on deleteAddress', () => {
    it('deletes the address for the given person id and index', () => {
      const lastState = fromJS({
        person_one: {addresses: [{
          id: '123',
          street: {value: '1234 Some Lane'},
          city: {value: 'Somewhere'},
          state: {value: 'CA'},
          zip: {value: '55555'},
          type: {value: 'Home'},
        }]},
        person_two: {addresses: [{
          id: 'ABC',
          street: {value: '5678 No Street'},
          city: {value: 'Nowhere'},
          state: {value: 'CA'},
          zip: {value: '55555'},
          type: {value: 'Cell'},
        }]},
      })
      const action = deleteAddress('person_one', 0)
      expect(peopleFormReducer(lastState, action)).toEqualImmutable(
        fromJS({
          person_one: {addresses: []},
          person_two: {addresses: [{
            id: 'ABC',
            street: {value: '5678 No Street'},
            city: {value: 'Nowhere'},
            state: {value: 'CA'},
            zip: {value: '55555'},
            type: {value: 'Cell'},
          }]},
        })
      )
    })
  })
})
