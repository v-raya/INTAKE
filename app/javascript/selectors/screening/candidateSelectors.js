import {Map, List} from 'immutable'
import nameFormatter from 'utils/nameFormatter'
import {dateFormatter} from 'utils/dateFormatter'
import {ageFormatter} from 'utils/ageFormatter'

const selectPerson = (person) => (Map({
  dateOfBirth: dateFormatter(person.get('date_of_birth')),
  legacyId: person.get('legacy_id'),
  name: nameFormatter({...person.toJS()}),
  gender: person.get('gender') || '',
  age: ageFormatter({
    age: person.get('age'),
    ageUnit: person.get('age_unit'),
  }),
}))

const selectCandidate = (candidate) => (Map({
  candidateId: candidate.get('candidate_id'),
  name: nameFormatter({
    first_name: candidate.get('candidate_first_name'),
    last_name: candidate.get('candidate_last_name'),
    middle_name: candidate.get('candidate_middle_name'),
    name_suffix: candidate.get('candidate_name_suffix'),
  }),
  gender: candidate.get('candidate_gender'),
  dateOfBirth: dateFormatter(candidate.get('candidate_date_of_birth')),
  age: ageFormatter({
    age: candidate.get('candidate_age'),
    ageUnit: candidate.get('candidate_age_unit'),
  }),
}))

const findPerson = (state, id) => (
  state.get('relationships').find((person) => person.get('id') === id)
)

export const selectCandidates = (state, id) => {
  const person = findPerson(state, id)
  if (!person) {
    return List()
  }
  const candidates = person.get('candidate_to', List())

  return candidates.map((candidate) => (Map({
    person: selectPerson(person),
    candidate: selectCandidate(candidate),
  })))
}
