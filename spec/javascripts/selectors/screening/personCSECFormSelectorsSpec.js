import {fromJS, List} from 'immutable'
import {
  getPersonCSECDetailsSelector,
  getCSECRequireValidationSelector,
  getVisibleErrorsSelector,
} from 'selectors/screening/personCSECFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'
import moment from 'moment'

describe('personCSECFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getPersonCSECDetailsSelector', () => {
    it('returns a blank person when person does not exist', () => {
      const peopleForm = {one: {}}
      const state = fromJS({peopleForm})
      expect(getPersonCSECDetailsSelector(state, 'one').toJS()).toEqual({
        CSECTypes: [],
        csecStartedAt: '',
        csecEndedAt: '',
      })
    })

    it('includes the csec types for the given person', () => {
      const peopleForm = {
        one: {
          roles: {value: ['Victim']},
          csec_types: {value: ['At Risk', 'Victim Before Foster Care']},
        },
      }
      const state = fromJS({peopleForm})
      expect(getPersonCSECDetailsSelector(state, 'one').get('CSECTypes'))
        .toEqual(List(['At Risk', 'Victim Before Foster Care']))
    })

    it('includes the csec start date for the given person', () => {
      const peopleForm = {one: {csec_started_at: {value: '1/1/1111'}}}
      const state = fromJS({peopleForm})
      expect(getPersonCSECDetailsSelector(state, 'one').get('csecStartedAt')).toEqual('1/1/1111')
    })

    it('includes the csec end date for the given person', () => {
      const peopleForm = {one: {csec_ended_at: {value: '2/2/2222'}}}
      const state = fromJS({peopleForm})
      expect(getPersonCSECDetailsSelector(state, 'one').get('csecEndedAt')).toEqual('2/2/2222')
    })
  })

  describe('getCSECRequireValidationSelector', () => {
    it('returns false if roles includes Victim and screeningReportType is empty', () => {
      const peopleForm = {
        one: {
          roles: {value: ['Victim', 'Some role']},
        },
      }
      const screeningInformationForm = {report_type: {value: ''}}
      const state = fromJS({peopleForm, screeningInformationForm})
      expect(getCSECRequireValidationSelector(state, 'one')).toEqual(false)
    })

    it('returns false if roles does not include victim and screeningReportType is csec', () => {
      const peopleForm = {
        one: {
          roles: {value: ['Some role']},
        },
      }
      const screeningInformationForm = {report_type: {value: 'csec'}}
      const state = fromJS({peopleForm, screeningInformationForm})
      expect(getCSECRequireValidationSelector(state, 'one')).toEqual(false)
    })

    it('returns true if roles includes Victim and screeningReportType is csec', () => {
      const peopleForm = {
        one: {
          roles: {value: ['Victim', 'Some role']},
        },
      }
      const screeningInformationForm = {report_type: {value: 'csec'}}
      const state = fromJS({peopleForm, screeningInformationForm})
      expect(getCSECRequireValidationSelector(state, 'one')).toEqual(true)
    })

    it('returns false if csec details are empty', () => {
      const participants = [
        {
          id: '1',
          csec: [],
        },
      ]
      const state = fromJS({participants})
      expect(getCSECRequireValidationSelector(state, '1')).toEqual(false)
    })

    it('returns true if csec details are not empty', () => {
      const participants = [
        {
          id: '1',
          csec: [{
            csec_code_id: '1',
            start_date: '1/1/1111',
          }],
        },
      ]
      const state = fromJS({participants})
      expect(getCSECRequireValidationSelector(state, '1')).toEqual(true)
    })
  })

  describe('getVisibleErrorsSelector', () => {
    describe('csec_ended_at', () => {
      it('returns an object with an empty array when no errors are present', () => {
        const yesterday = moment().subtract(1, 'days').toISOString()
        const peopleForm = {
          one: {
            csec_ended_at: {value: yesterday, touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_ended_at'))
          .toEqualImmutable(List())
      })

      it('returns an error if csec end date is in the future and touched', () => {
        const tomorrow = moment().add(1, 'days').toISOString()
        const peopleForm = {
          one: {
            csec_ended_at: {value: tomorrow, touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_ended_at'))
          .toEqualImmutable(List(['The end date and time cannot be in the future.']))
      })
    })

    describe('csec_started_at', () => {
      it('returns an object with an empty array when no errors are present', () => {
        const yesterday = moment().subtract(1, 'days').toISOString()
        const peopleForm = {
          one: {
            csec_started_at: {value: yesterday, touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_started_at'))
          .toEqualImmutable(List())
      })

      it('returns an error if csec types is not present and touched', () => {
        const peopleForm = {
          one: {
            csec_types: {value: '', touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_types'))
          .toEqualImmutable(List(['CSEC type must be selected.']))
      })

      it('returns an error if csec types is a emtpy list and touched', () => {
        const peopleForm = {
          one: {
            csec_types: {value: List(), touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_types'))
          .toEqualImmutable(List(['CSEC type must be selected.']))
      })

      it('doesnot returns an error if csec types is a present', () => {
        const peopleForm = {
          one: {
            csec_types: {value: ['At Risk', 'Victim Before Foster Care'], touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_types'))
          .toEqualImmutable(List([]))
      })

      it('returns an error if csec start date has an empty string and touched', () => {
        const peopleForm = {
          one: {
            csec_started_at: {value: '', touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_started_at'))
          .toEqualImmutable(List(['Start date must be entered.']))
      })

      it('returns an error if csec start date is in the future and touched', () => {
        const tomorrow = moment().add(1, 'days').toISOString()
        const peopleForm = {
          one: {
            csec_started_at: {value: tomorrow, touched: true},
          },
        }
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_started_at'))
          .toEqualImmutable(List(['The start date and time cannot be in the future.']))
      })

      it('returns an error if csec start date is after the end date and touched', () => {
        const peopleForm = {one: {
          csec_started_at: {value: '2017-10-05T21:10:00.000', touched: true},
          csec_ended_at: {value: '2017-10-04T21:10:00.012', touched: true},
        }}
        const state = fromJS({peopleForm})
        expect(getVisibleErrorsSelector(state, 'one').get('csec_started_at'))
          .toEqualImmutable(
            List(['The start date and time must be before the end date and time.']))
      })
    })
  })
})
