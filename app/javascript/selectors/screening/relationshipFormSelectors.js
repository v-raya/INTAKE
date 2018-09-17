import {Map} from 'immutable'
import {Maybe} from 'utils/maybe'
import {createSelector} from 'reselect'
import {getScreeningRelationships} from 'selectors/screening/relationshipsSelectors'

const selectPerson = (id, people) =>
  Maybe.of(people.find((person) => person.get('id') === id))

const selectRelatee = (relativeId) => (person) =>
  Maybe.of(person.get('relationships')
    .find((relatee) => relatee.get('related_person_id') === relativeId))

const isChangeForm = (relationshipForm) => (relatee) =>
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

export const selectIsFormChangeState = createSelector(
  selectRelationship,
  getScreeningRelationships,
  (relationshipForm, people) =>
    selectPerson(relationshipForm.get('client_id'), people)
      .chain(selectRelatee(relationshipForm.get('relative_id')))
      .map(isChangeForm(relationshipForm))
      .valueOrElse(false)
)
