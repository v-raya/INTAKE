import {fromJS} from 'immutable'
import {
  getContactPayloadSelector,
} from 'selectors/screening/contactSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('contactSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getContactPayloadSelector', () => {
    it('returns the contact payload when screening is present', () => {
      const screening = {id: 'ABC', started_at: '2018-12-12', ended_at: '2018-12-12', report_narrative: 'note'}
      const peopleForm = fromJS([
        {id: '123', first_name: '', middle_name: '', last_name: ''},
      ])
      const people = peopleForm.map((person) => (
        {
          legacy_descriptor: person.getIn(['legacy_descriptor', 'value']),
          first_name: person.getIn(['first_name', 'value']),
          last_name: person.getIn(['last_name', 'value']),
          middle_name: person.getIn(['middle_name', 'value']),
          name_suffix: person.getIn(['name_suffix', 'value']),
        }))
      const contactPayload = {
        contact:
          {
            started_at: '2018-12-12',
            ended_at: '2018-12-12',
            purpose: '439',
            communication_method: undefined,
            status: 'C',
            location: '415',
            note: 'note',
            people: people,
          },
      }
      const state = fromJS({screening, peopleForm})
      expect(fromJS(getContactPayloadSelector(state))).toEqual(fromJS(contactPayload))
    })
  })
})
