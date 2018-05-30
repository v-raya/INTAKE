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
  ssb.set('surrendered_by', getName(getParticipant(state, ssb.get('surrendered_by'))))

const onlyForChild = (personId, ssb) =>
  (ssb && ssb.get('participant_child') === personId ? ssb : null)

const display = (ssb) => ssb &&
  ssb
    .set(
      'relation_to_child',
      RELATIONS[ssb.get('relation_to_child')])
    .set(
      'parent_guardian_given_bracelet_id',
      GIVEN_BRACELET_RESPONSES[ssb.get('parent_guardian_given_bracelet_id')])
    .set(
      'parent_guardian_provided_med_questionaire',
      GIVEN_MED_QUESTIONAIRE_RESPONSES[ssb.get('parent_guardian_provided_med_questionaire')])

export const getRawFormSafelySurrenderedBaby = (state, personId) =>
  onlyForChild(personId, getSSB(state, 'form'))

export const getFormSafelySurrenderedBaby = (state, personId) =>
  fillName(state, getRawFormSafelySurrenderedBaby(state, personId))

export const getPersistedSafelySurrenderedBaby = (state, personId) =>
  fillName(state, display(onlyForChild(personId, getSSB(state, 'persisted'))))
