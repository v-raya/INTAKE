import 'babel-polyfill'
import {fromJS} from 'immutable'
import {takeEvery, select, put} from 'redux-saga/effects'
import {
  SAVE_SSB,
  saveSSB as saveSSBAction,
  saveSSBSuccess,
} from 'actions/safelySurrenderedBabyActions'
import {saveSSB, saveSSBSaga} from 'sagas/safelySurrenderedBabySagas'
import {
  getFormSafelySurrenderedBaby,
} from 'selectors/screening/safelySurrenderedBabySelectors'

describe('saveSSBSaga', () => {
  it('saves SSB info on SAVE_SSB', () => {
    const gen = saveSSBSaga()
    expect(gen.next().value).toEqual(takeEvery(SAVE_SSB, saveSSB))
  })
})

describe('saveSSB', () => {
  const personId = '555'
  const formState = fromJS({
    surrenderedBy: 'Hagrid',
    relationToChild: '1592',
    braceletId: 'Lightning',
    parentGuardGivenBraceletId: 'unknown',
    parentGuardProvMedicalQuestionaire: 'unknown',
    comments: 'Yer a wizard, Harry!',
    medQuestionaireReturnDate: '2001-11-14',
  })

  it('does nothing if the person is not the participant child', () => {
    const gen = saveSSB(saveSSBAction('1001'))
    expect(gen.next().value).toEqual(
      select(getFormSafelySurrenderedBaby, '1001')
    )

    const returned = gen.next(undefined)
    expect(returned.value).toEqual(undefined)
    expect(returned.done).toEqual(true)
  })
  it('puts the result directly into a success action', () => {
    const gen = saveSSB(saveSSBAction(personId))
    expect(gen.next().value).toEqual(
      select(getFormSafelySurrenderedBaby, personId)
    )

    const returned = gen.next(formState)
    expect(returned.value).toEqual(
      put(saveSSBSuccess(formState.toJS()))
    )
  })
})
