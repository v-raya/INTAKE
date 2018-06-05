import {takeEvery, call, put} from 'redux-saga/effects'
import {setAllegationTypes} from 'actions/allegationsFormActions'
import {createPersonSuccess} from 'actions/personCardActions'
import {GENERATE_BABY_DOE} from 'actions/safelySurrenderedBabyActions'
import {saveCard} from 'actions/screeningActions'
import {cardName as allegationsCardName} from 'containers/screenings/AllegationsFormContainer'
import {babyDoe, caretakerDoe} from 'data/participants'
import {
  generateBabyDoe,
  generateBabyDoeSaga,
} from 'sagas/generateBabyDoeSaga'
import {post} from 'utils/http'

describe('generateBabyDoeSaga', () => {
  it('triggers SSB info creation on GENERATE_BABY_DOE', () => {
    const gen = generateBabyDoeSaga()
    expect(gen.next().value).toEqual(takeEvery(GENERATE_BABY_DOE, generateBabyDoe))
  })
})

describe('triggerSSB', () => {
  const screening_id = '1'

  it('adds Baby Doe and Caretaker Doe', () => {
    const gen = generateBabyDoe({payload: screening_id})
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
        ...caretakerDoe,
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
