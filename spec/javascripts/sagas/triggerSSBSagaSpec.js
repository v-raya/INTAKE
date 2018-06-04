import {fromJS} from 'immutable'
import {takeEvery, call, select, put} from 'redux-saga/effects'
import {createPersonSuccess} from 'actions/personCardActions'
import {saveSuccess} from 'actions/screeningActions'
import {babyDoe, parentDoe} from 'data/participants'
import {
  triggerSSB,
  triggerSSBSaga,
} from 'sagas/triggerSSBSaga'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {post, put as putHTTP} from 'utils/http'

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

    expect(gen.next().value).toEqual(select(getScreeningSelector))

    const screening = {
      participants: [babyDoe, parentDoe],
    }

    const allegation = {
      screening_id,
      victim_person_id: '111',
      perpetrator_person_id: '222',
      types: ['Caretaker absent/incapacity'],
    }

    expect(gen.next(fromJS(screening)).value).toEqual(call(putHTTP, '/api/v1/screenings/1', {
      screening: {
        ...screening,
        participants: [babyDoe, parentDoe],
        allegations: [allegation],
      },
    }))

    const screeningResponse = 'New Screening'
    const putScreening = gen.next(screeningResponse)
    expect(putScreening.value).toEqual(put(saveSuccess(screeningResponse)))
  })
})
