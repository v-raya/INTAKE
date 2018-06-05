import {
  RELATIONS,
  GIVEN_BRACELET_RESPONSES,
  GIVEN_MED_QUESTIONAIRE_RESPONSES,
} from 'enums/SafelySurrenderedBabyEnums'
import {Maybe} from 'utils/maybe'

const getSSB = (state, type) => Maybe.of(state.getIn(['safelySurrenderedBaby', type]))

const fillName = (ssb) => ssb.set('surrendered_by', ssb.get('surrendered_by') || 'Unknown')

const onlyForChild = (personId) => (ssb) =>
  Maybe.of(ssb).filter((ssb) => ssb.get('participant_child') === personId)

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

export const getFormSafelySurrenderedBaby = (state, personId) =>
  getSSB(state, 'form')
    .chain(onlyForChild(personId))
    .map(fillName)

export const getPersistedSafelySurrenderedBaby = (state, personId) =>
  getSSB(state, 'persisted')
    .chain(onlyForChild(personId))
    .map(display)
    .map(fillName)
