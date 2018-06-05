import {takeEvery, call, put} from 'redux-saga/effects'
import {setAllegationTypes} from 'actions/allegationsFormActions'
import {createPersonSuccess} from 'actions/personCardActions'
import {saveCard} from 'actions/screeningActions'
import {cardName as allegationsCardName} from 'containers/screenings/AllegationsFormContainer'
import {babyDoe, parentDoe} from 'data/participants'
import {
  triggerSSB,
  triggerSSBSaga,
} from 'sagas/triggerSSBSaga'
import {post} from 'utils/http'

describe('triggerSSBSaga', () => {
  it('triggers SSB info creation on TRIGGER_SSB', () => {
    const gen = triggerSSBSaga()
    expect(gen.next().value).toEqual(takeEvery('TRIGGER_SSB', triggerSSB))
  })
})

describe('triggerSSB', () => {
  const screening_id = '1'

  it('adds Baby Doe and Parent Doe', () => {
    const gen = triggerSSB({payload: screening_id})
    expect(gen.next().value).toEqual(call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...babyDoe,
      },
    }))

    const babyResponse = {id: '111'}
    const putBaby = gen.next(babyResponse)

    expect(putBaby.value).toEqual(put(createPersonSuccess(babyResponse)))

    expect(gen.next().value).toEqual(call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...parentDoe,
      },
    }))

    const caretakerResponse = {id: '222'}
    const putCaretaker = gen.next(caretakerResponse)

    expect(putCaretaker.value).toEqual(put(createPersonSuccess(caretakerResponse)))

    expect(gen.next().value).toEqual(put(setAllegationTypes({
      victimId: '111',
      perpetratorId: '222',
      allegationTypes: ['Caretaker absent/incapacity'],
    })))
    expect(gen.next().value).toEqual(put(saveCard(allegationsCardName)))
  })
})
