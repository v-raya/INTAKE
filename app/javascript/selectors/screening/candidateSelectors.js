import {List, Map} from 'immutable'
import {Maybe} from 'utils/maybe'

export const selectCandidates = (state, id) =>
  state.get('candidatesForm').get(id, List())

const isEmptyRelationship = (candidate) =>
  candidate.get('relationship_type') === ''

const toCode = (candidate) =>
  Maybe.of(candidate.getIn(['candidate', 'relationshipType']))
    .map((type) => parseInt(type, 10))
    .map((code) => {
      if (isNaN(code)) {
        return ''
      } else {
        return code
      }
    })
    .valueOrElse('')

export const selectCandidatesWithEdits = (state, id) => (Map({
  relationships: selectCandidates(state, id)
    .map((candidate) => Map({
      client_id: candidate.getIn(['person', 'id']),
      relative_id: candidate.getIn(['candidate', 'id']),
      relationship_type: toCode(candidate),
      absent_parent_indicator: false,
      same_home_status: 'N',
    }))
    .filterNot(isEmptyRelationship),
}))
