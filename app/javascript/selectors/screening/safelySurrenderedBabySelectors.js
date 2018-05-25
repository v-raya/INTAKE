import {
  RELATIONS,
  GIVEN_BRACELET_RESPONSES,
  GIVEN_MED_QUESTIONAIRE_RESPONSES,
} from 'enums/SafelySurrenderedBabyEnums'

const getSSB = (state, type) => state.getIn(['safelySurrenderedBaby', type])

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

export const getFormSafelySurrenderedBaby = (state, personId) =>
  onlyForChild(personId, getSSB(state, 'form'))

export const getPersistedSafelySurrenderedBaby = (state, personId) =>
  display(onlyForChild(personId, getSSB(state, 'persisted')))
