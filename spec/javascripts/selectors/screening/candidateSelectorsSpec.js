import {fromJS} from 'immutable'
import {selectCandidates} from 'selectors/screening/candidateSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('candidateSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const candidatesForm = {
    1: [{
      person: {
        age: '20 yrs',
        dateOfBirth: '01/15/1986',
        id: '1',
        gender: 'Male',
        legacyId: '3',
        name: 'Ricky Robinson',
      },
      candidate: {
        age: '30 yrs',
        dateOfBirth: '11/11/1958',
        id: '4157',
        gender: 'Male',
        name: 'New York C Pechan, Sr',
      },
    }, {
      person: {
        age: '20 yrs',
        dateOfBirth: '01/15/1986',
        id: '1',
        gender: 'Male',
        legacyId: '3',
        name: 'Ricky Robinson',
      },
      candidate: {
        age: '40 yrs',
        dateOfBirth: '11/11/1968',
        id: '4158',
        gender: 'Male',
        name: 'Walter A White, Sr',
      },
    }],
    2: [],
  }
  describe('selectCandidates', () => {
    it('returns a list of candidates', () => {
      const id = '1'
      const state = fromJS({candidatesForm})
      expect(selectCandidates(state, id)).toEqualImmutable(fromJS([{
        person: {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          id: '1',
          gender: 'Male',
          legacyId: '3',
          name: 'Ricky Robinson',
        },
        candidate: {
          age: '30 yrs',
          dateOfBirth: '11/11/1958',
          id: '4157',
          gender: 'Male',
          name: 'New York C Pechan, Sr',
        },
      }, {
        person: {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          id: '1',
          gender: 'Male',
          legacyId: '3',
          name: 'Ricky Robinson',
        },
        candidate: {
          age: '40 yrs',
          dateOfBirth: '11/11/1968',
          id: '4158',
          gender: 'Male',
          name: 'Walter A White, Sr',
        },
      }]))
    })

    it('returns an empty List when candidates are empty', () => {
      const id = '2'
      const state = fromJS({candidatesForm})
      expect(selectCandidates(state, id)).toEqualImmutable(fromJS([]))
    })
  })
})
