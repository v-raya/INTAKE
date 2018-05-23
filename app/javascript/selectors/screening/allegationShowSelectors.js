import {createSelector} from 'reselect'
import {List, Map} from 'immutable'
import nameFormatter from 'utils/nameFormatter'
const FLATTEN_LEVEL = 1

const getAllegationsSelector = createSelector(
  (state) => state.getIn(['screening', 'allegations'], List()),
  (state) => state.getIn(['screening', 'participants'], List()),
  (allegations, people) => allegations.map((allegation) => {
    const allegation_types = allegation.get('types') || []
    const victim_id = (allegation.get('victim_person_id') || '').toString()
    const victim = people.find((person) => person.get('id') === victim_id) || Map()
    const perpetrator_id = (allegation.get('perpetrator_person_id') || '').toString()
    const perpetrator = people.find((person) => person.get('id') === perpetrator_id) || Map()
    return Map({allegation_types, victim, victim_id, perpetrator})
  })
)

export const getFormattedAllegationsSelector = createSelector(
  getAllegationsSelector,
  (allegations) => (
    allegations.map((allegation) => (
      allegation.get('allegation_types', List()).sort().map((allegationType) => (
        Map({
          victim: nameFormatter(allegation.get('victim').toJS()),
          perpetrator: nameFormatter(allegation.get('perpetrator').toJS()),
          type: allegationType,
        })
      ))
    )).flatten(FLATTEN_LEVEL)
  )
)
