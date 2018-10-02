import {fromJS, List} from 'immutable'
import moment from 'moment'
import {
  selectErrors,
  selectRelationship,
  selectIsFormNoChangeState,
  selectIsInvalidForm,
  selectIsSaving,
} from 'selectors/screening/relationshipFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('relationshipSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const emptyState = fromJS({relationshipForm: {}})
  const relationshipForm = fromJS({
    relationship: {
      absent_parent_indicator: true,
      client_id: 'ZXY123',
      end_date: '2010-10-01',
      id: '12345',
      relationship_type: 190,
      relative_id: 'ABC987',
      reversed: false,
      same_home_status: 'Y',
      start_date: '1999-10-01',
    }})

  it('returns a an empty Map', () => {
    expect(selectRelationship(emptyState)).toEqualImmutable(fromJS({}))
  })

  it('returns a relationship', () => {
    const state = fromJS({relationshipForm})
    expect(selectRelationship(state)).toEqualImmutable(
      fromJS({
        absent_parent_indicator: true,
        client_id: 'ZXY123',
        end_date: '2010-10-01',
        id: '12345',
        relationship_type: 190,
        relative_id: 'ABC987',
        reversed: false,
        same_home_status: 'Y',
        start_date: '1999-10-01',
      })
    )
  })

  describe('selectIsFormNoChangeState', () => {
    it('returns false if no relatee is found', () => {
      const relationships = [{id: 'ZXY123', relationships: []}]
      const state = fromJS({relationshipForm, relationships})
      expect(selectIsFormNoChangeState(state)).toBe(false)
    })
    it('returns true if edit relationship form has no changed state', () => {
      const relationships = [{
        id: 'ZXY123',
        relationships: [{
          absent_parent_code: 'Y',
          end_date: '2010-10-01',
          indexed_person_relationship: '190',
          related_person_id: 'ABC987',
          relationship_id: '12345',
          reversed: false,
          same_home_code: 'Y',
          start_date: '1999-10-01',
        }],
      }]
      const state = fromJS({relationshipForm, relationships})
      expect(selectIsFormNoChangeState(state)).toBe(true)
    })
    it('returns false if edit relationship form has changed state', () => {
      const relationships = [{
        id: 'ZXY123',
        relationships: [{
          absent_parent_code: 'N',
          end_date: '2010-10-01',
          indexed_person_relationship: '211',
          related_person_id: 'ABC987',
          relationship_id: '12345',
          reversed: false,
          same_home_code: 'Y',
          start_date: '1999-10-01',
        }],
      }]
      const state = fromJS({relationshipForm, relationships})
      expect(selectIsFormNoChangeState(state)).toBe(false)
    })
  })

  describe('selectErrors', () => {
    it('returns an object with an empty array when no errors are present', () => {
      const yesterday = moment().subtract(1, 'days').toISOString()
      const relationshipForm = {relationship: {started_at: yesterday}}
      const state = fromJS({relationshipForm})
      expect(selectErrors(state).get('started_at')).toEqualImmutable(List())
    })
    it('returns an error if date is after the end date', () => {
      const relationshipForm = {
        relationship: {
          start_date: '2017-10-05T21:10:00.000',
          end_date: '2017-09-04T21:10:00.012',
        },
      }
      const state = fromJS({relationshipForm})
      expect(
        selectErrors(state).get('started_at')
      ).toEqualImmutable(List(['The start date must be before the end date.']))
    })
  })

  describe('selectIsSaving', () => {
    it('returns the value of isSaving', () => {
      const relationshipForm = {isSaving: true}
      const state = fromJS({relationshipForm})
      expect(selectIsSaving(state)).toBe(true)
    })
  })

  describe('selectIsInvalidForm', () => {
    it('returns false if form has no changes and no errors', () => {
      const relationships = [{
        id: 'ZXY123',
        relationships: [{
          absent_parent_code: 'N',
          end_date: '2010-10-01',
          indexed_person_relationship: '211',
          related_person_id: 'ABC987',
          relationship_id: '12345',
          reversed: false,
          same_home_code: 'Y',
          start_date: '1999-10-01',
        }],
      }]
      const state = fromJS({relationshipForm, relationships})
      expect(selectIsInvalidForm(state)).toBe(false)
    })
    it('returns true if form has changes and no errors', () => {
      const relationships = [{
        id: 'ZXY123',
        relationships: [{
          absent_parent_code: 'Y',
          end_date: '2010-10-01',
          indexed_person_relationship: '190',
          related_person_id: 'ABC987',
          relationship_id: '12345',
          reversed: false,
          same_home_code: 'Y',
          start_date: '1999-10-01',
        }],
      }]
      const state = fromJS({relationshipForm, relationships})
      expect(selectIsInvalidForm(state)).toBe(true)
    })
    it('returns true if form has errors such as start date and end date', () => {
      const relationshipForm = {
        relationship: {
          absent_parent_code: 'Y',
          end_date: '2017-09-04T21:10:00.012',
          indexed_person_relationship: '190',
          related_person_id: 'ABC987',
          relationship_id: '12345',
          reversed: false,
          same_home_code: 'Y',
          start_date: '2017-10-05T21:10:00.000',
        },
      }
      const state = fromJS({relationshipForm})
      expect(selectIsInvalidForm(state)).toBe(true)
    })
  })
})
