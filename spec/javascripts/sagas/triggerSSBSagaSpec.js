import {takeEvery, call, select} from 'redux-saga/effects'
import {babyDoe, parentDoe} from 'data/participants'
import {
  triggerSSB,
  triggerSSBSaga,
} from 'sagas/triggerSSBSaga'
import {getScreeningSelector} from 'selectors/screeningSelectors'
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

    expect(gen.next({id: '111'}).value).toEqual(call(post, '/api/v1/participants', {
      participant: {
        screening_id,
        ...parentDoe,
      },
    }))

    expect(gen.next({id: '222'}).value).toEqual(select(getScreeningSelector))
  })
})
