import {
  RELATIONS,
  GIVEN_BRACELET_RESPONSES,
  GIVEN_MED_QUESTIONAIRE_RESPONSES,
} from 'enums/SafelySurrenderedBabyEnums'
import nameFormatter from 'utils/nameFormatter'
import {Maybe} from 'utils/maybe'

const getParticipant = (state, personId) => Maybe.of(state)
  .map((s) => s.get('participants'))
  .map((ps) => ps.find((person) => person.get('id') === personId))

const getName = (participant) => nameFormatter(participant.toJS())

const getSSB = (state, type) => Maybe.of(state.getIn(['safelySurrenderedBaby', type]))

const fillName = (state) => (ssb) => ssb.set(
  'surrendered_by',
  getParticipant(state, ssb.get('surrendered_by')).map(getName).valueOrElse('Unknown')
)

const onlyForChild = (personId) => (ssb) =>
  Maybe.of(ssb.get('participant_child') === personId ? ssb : null)

const display = (ssb) => ssb
  .set(
    'relation_to_child',
    RELATIONS[ssb.get('relation_to_child')])
  .set(
    'parent_guardian_given_bracelet_id',
    GIVEN_BRACELET_RESPONSES[ssb.get('parent_guardian_given_bracelet_id')])
  .set(
    'parent_guardian_provided_med_questionaire',
    GIVEN_MED_QUESTIONAIRE_RESPONSES[ssb.get('parent_guardian_provided_med_questionaire')])

const rawFormSSB = (state, personId) => getSSB(state, 'form').chain(onlyForChild(personId))

export const getRawFormSafelySurrenderedBaby = (state, personId) =>
  rawFormSSB(state, personId).valueOrElse(null)

export const getFormSafelySurrenderedBaby = (state, personId) =>
  rawFormSSB(state, personId).map(fillName(state)).valueOrElse(null)

export const getPersistedSafelySurrenderedBaby = (state, personId) =>
  getSSB(state, 'persisted')
    .chain(onlyForChild(personId))
    .map(display)
    .map(fillName(state))
    .valueOrElse(null)
