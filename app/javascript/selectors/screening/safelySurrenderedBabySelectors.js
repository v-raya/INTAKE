import {
  RELATIONS,
  GIVEN_BRACELET_RESPONSES,
  GIVEN_MED_QUESTIONAIRE_RESPONSES,
} from 'enums/SafelySurrenderedBabyEnums'

const findSSB = (state, personId) =>
  state.find((value, key) =>
    key === 'safelySurrenderedBaby' &&
    value &&
    value.get('participant_child_id') === personId
  )

const getPersisted = (ssb) => ssb && ssb.get('persisted')
const getForm = (ssb) => ssb && ssb.get('form')

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
  getForm(findSSB(state, personId))

export const getPersistedSafelySurrenderedBaby = (state, personId) =>
  display(getPersisted(findSSB(state, personId)))
