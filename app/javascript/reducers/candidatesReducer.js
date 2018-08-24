import {LOAD_CREATE_RELATIONSHIPS_CANDIDATES} from 'actions/relationshipsActions'
import {createReducer} from 'utils/createReducer'
import {fromFerbRelationship} from 'data/relationship'
import {List, fromJS} from 'immutable'

const extractCandidates = (candidates) =>
  fromJS(candidates).map(
    (candidate) => fromFerbRelationship(candidate.get('person'), candidate.get('candidate'))
  )

const loadCandidates = (state, {payload: {candidates}}) =>
  extractCandidates(candidates)

export default createReducer(List(), {
  [LOAD_CREATE_RELATIONSHIPS_CANDIDATES]: loadCandidates,
})
