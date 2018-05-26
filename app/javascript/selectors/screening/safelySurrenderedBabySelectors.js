import {List} from 'immutable'
import {
  RELATIONS,
  GIVEN_BRACELET_RESPONSES,
  GIVEN_MED_QUESTIONAIRE_RESPONSES,
} from 'enums/SafelySurrenderedBabyEnums'
import nameFormatter from 'utils/nameFormatter'

const getParticipant = (state, personId) =>
  state.get('participants', List()).find((person) => person.get('id') === personId)

const getName = (participant) => (participant ? nameFormatter(participant.toJS()) : 'Unknown')

const getSSB = (state, type) => state.getIn(['safelySurrenderedBaby', type])

const fillName = (state, ssb) => ssb &&
  ssb.set('surrenderedBy', getName(getParticipant(state, ssb.get('surrenderedBy'))))

const onlyForChild = (personId, ssb) =>
  (ssb && ssb.get('participantChildId') === personId ? ssb : null)

const display = (ssb) => ssb &&
  ssb
    .set(
      'relationToChild',
      RELATIONS[ssb.get('relationToChild')])
    .set(
      'parentGuardGivenBraceletId',
      GIVEN_BRACELET_RESPONSES[ssb.get('parentGuardGivenBraceletId')])
    .set(
      'parentGuardProvMedicalQuestionaire',
      GIVEN_MED_QUESTIONAIRE_RESPONSES[ssb.get('parentGuardProvMedicalQuestionaire')])

export const getRawFormSafelySurrenderedBaby = (state, personId) =>
  onlyForChild(personId, getSSB(state, 'form'))

export const getFormSafelySurrenderedBaby = (state, personId) =>
  fillName(state, getRawFormSafelySurrenderedBaby(state, personId))

export const getPersistedSafelySurrenderedBaby = (state, personId) =>
  fillName(state, display(onlyForChild(personId, getSSB(state, 'persisted'))))
