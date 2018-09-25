import {fromJS, Map} from 'immutable'
import {Maybe} from 'utils/maybe'
import {createSelector} from 'reselect'
import {getScreeningRelationships} from 'selectors/screening/relationshipsSelectors'
import {combineCompact, isBeforeDatetimeCreate} from 'utils/validator'

const selectPerson = (id, people) =>
  Maybe.of(people.find((person) => person.get('id') === id))

const selectRelatee = (relativeId) => (person) =>
  Maybe.of(person.get('relationships')
    .find((relatee) => relatee.get('related_person_id') === relativeId))

const isFormNoChange = (relationshipForm) => (relatee) =>
  relationshipForm.equals(Map({
    absent_parent_indicator: (relatee.get('absent_parent_code') === 'Y'),
    client_id: relationshipForm.get('client_id'),
    end_date: relatee.get('end_date') || null,
    id: relatee.get('relationship_id'),
    relationship_type: parseInt(relatee.get('indexed_person_relationship'), 10),
    relative_id: relatee.get('related_person_id'),
    reversed: relatee.get('reversed'),
    same_home_status: relatee.get('same_home_code'),
    start_date: relatee.get('start_date') || null,
  }))

export const selectRelationship = (state) => (state.get('relationshipForm', Map()))

export const selectErrors = createSelector(
  (state) => state.getIn(['relationshipForm', 'end_date']),
  (state) => state.getIn(['relationshipForm', 'start_date']),
  (endDate, startDate) => fromJS({
    started_at: combineCompact(
      isBeforeDatetimeCreate(endDate, startDate, 'The start date must be before the end date.')
    ),
  })
)

export const selectIsFormNoChangeState = createSelector(
  selectRelationship,
  getScreeningRelationships,
  (relationshipForm, people) =>
    selectPerson(relationshipForm.get('client_id'), people)
      .chain(selectRelatee(relationshipForm.get('relative_id')))
      .map(isFormNoChange(relationshipForm))
      .valueOrElse(false)
)
