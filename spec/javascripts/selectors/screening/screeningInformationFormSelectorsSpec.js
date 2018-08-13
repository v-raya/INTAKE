import {
  getScreeningWithEditsSelector,
  getVisibleErrorsSelector,
} from 'selectors/screening/screeningInformationFormSelectors'
import {fromJS, List} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import moment from 'moment'

describe('screeningInformationFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getScreeningWithEditsSelector', () => {
    const screeningInformationForm = {
      name: {value: 'an edited name'},
      report_type: {value: 'an edited report type'},
      started_at: {value: 'an edited start date time'},
      ended_at: {value: 'an edited end date time'},
      assignee: {value: 'an edited assignee'},
      communication_method: {value: 'an edited communication method'},
    }

    it('returns a screening with updated screening information form field values', () => {
      const screening = {
        id: 'existing_screening_id',
        name: 'old value',
        report_type: 'old value',
        started_at: 'old value',
        ended_at: 'old value',
        assignee: 'old value',
        communication_method: 'old value',
      }
      const state = fromJS({screening, screeningInformationForm})
      expect(getScreeningWithEditsSelector(state))
        .toEqualImmutable(
          fromJS({
            id: 'existing_screening_id',
            name: 'an edited name',
            report_type: 'an edited report type',
            started_at: 'an edited start date time',
            ended_at: 'an edited end date time',
            assignee: 'an edited assignee',
            communication_method: 'an edited communication method',
            participants: [],
          })
        )
    })

    it('takes the participants from the participants list', () => {
      const screening = {
        id: 'existing_screening_id',
        name: 'old value',
        report_type: 'old value',
        started_at: 'old value',
        ended_at: 'old value',
        assignee: 'old value',
        communication_method: 'old value',
        participants: [{id: '456', first_name: 'Luigi', addresses: []}],
      }
      const participants = [{id: '123', first_name: 'Mario', addresses: []}]
      const state = fromJS({screening, screeningInformationForm, participants})
      expect(getScreeningWithEditsSelector(state))
        .toEqualImmutable(
          fromJS({
            id: 'existing_screening_id',
            name: 'an edited name',
            report_type: 'an edited report type',
            started_at: 'an edited start date time',
            ended_at: 'an edited end date time',
            assignee: 'an edited assignee',
            communication_method: 'an edited communication method',
            participants,
          })
        )
    })

    it('converts addresses to the format Ferb expects', () => {
      const screening = {
        id: 'existing_screening_id',
        name: 'old value',
        report_type: 'old value',
        started_at: 'old value',
        ended_at: 'old value',
        assignee: 'old value',
        communication_method: 'old value',
        participants: [],
      }
      const participants = [{
        id: '1',
        first_name: 'Mario',
        addresses: [{
          id: '1',
          street: '1000 Peach Castle',
          city: 'World 1-1',
          state: 'Mushroom Kingdom',
          zip: '00001',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'ABC123'},
        }],
      }]

      const state = fromJS({screening, screeningInformationForm, participants})
      expect(getScreeningWithEditsSelector(state))
        .toEqualImmutable(
          fromJS({
            id: 'existing_screening_id',
            name: 'an edited name',
            report_type: 'an edited report type',
            started_at: 'an edited start date time',
            ended_at: 'an edited end date time',
            assignee: 'an edited assignee',
            communication_method: 'an edited communication method',
            participants: [{
              id: '1',
              first_name: 'Mario',
              addresses: [{
                id: '1',
                street_address: '1000 Peach Castle',
                city: 'World 1-1',
                state: 'Mushroom Kingdom',
                zip: '00001',
                type: 'Home',
                legacy_descriptor: {legacy_id: 'ABC123'},
              }],
            }],
          })
        )
    })
  })

  describe('getVisibleErrorsSelector', () => {
    describe('assignee', () => {
      it('returns an error if empty and touched', () => {
        const screeningInformationForm = {
          assignee: {value: '', touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('assignee'))
          .toEqualImmutable(List(['Please enter an assigned worker.']))
      })

      it('returns no errors if present and touched', () => {
        const screeningInformationForm = {
          assignee: {value: 'a sample assignee', touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('assignee'))
          .toEqualImmutable(List([]))
      })
    })

    describe('communication_method', () => {
      it('returns an error if empty and touched', () => {
        const screeningInformationForm = {
          communication_method: {value: '', touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('communication_method'))
          .toEqualImmutable(List(['Please select a communication method.']))
      })

      it('returns no errors if present and touched', () => {
        const screeningInformationForm = {
          communication_method: {value: 'a sample communication_method', touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('communication_method'))
          .toEqualImmutable(List([]))
      })
    })

    describe('ended_at', () => {
      it('returns an object with an empty array when no errors are present', () => {
        const yesterday = moment().subtract(1, 'days').toISOString()
        const screeningInformationForm = {
          ended_at: {value: yesterday, touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('ended_at'))
          .toEqualImmutable(List())
      })

      it('returns an error if date is in the future and touched', () => {
        const tomorrow = moment().add(1, 'days').toISOString()
        const screeningInformationForm = {
          ended_at: {value: tomorrow, touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('ended_at'))
          .toEqualImmutable(List(['The end date and time cannot be in the future.']))
      })
    })

    describe('started_at', () => {
      it('returns an object with an empty array when no errors are present', () => {
        const yesterday = moment().subtract(1, 'days').toISOString()
        const screeningInformationForm = {
          started_at: {value: yesterday, touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('started_at'))
          .toEqualImmutable(List())
      })

      it('returns an error if an empty string and touched', () => {
        const screeningInformationForm = {
          started_at: {value: '', touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('started_at'))
          .toEqualImmutable(List(['Please enter a screening start date.']))
      })

      it('returns an error if date is in the future and touched', () => {
        const tomorrow = moment().add(1, 'days').toISOString()
        const screeningInformationForm = {
          started_at: {value: tomorrow, touched: true},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('started_at'))
          .toEqualImmutable(List(['The start date and time cannot be in the future.']))
      })

      it('returns an error if date is after the end date and touched', () => {
        const screeningInformationForm = {
          started_at: {value: '2017-10-05T21:10:00.000', touched: true},
          ended_at: {value: '2017-10-04T21:10:00.012'},
        }
        const state = fromJS({screeningInformationForm})
        expect(getVisibleErrorsSelector(state).get('started_at'))
          .toEqualImmutable(
            List(['The start date and time must be before the end date and time.'])
          )
      })
    })
  })
})
