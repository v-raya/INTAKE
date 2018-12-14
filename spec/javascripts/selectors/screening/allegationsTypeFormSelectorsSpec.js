import {fromJS} from 'immutable'
import {getAllegationsWithTypesSelector} from 'selectors/screening/allegationsTypeFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('allegationsTypeFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getAllegationsWithTypesSelector', () => {
    it('returns empty when allegations is blank', () => {
      const allegationsForm = [{
        id: 1,
        victimId: '123abc',
        perpetratorId: 'cba321',
        allegationTypes: [''],
      }]
      const state = fromJS({
        allegationsForm})
      expect(getAllegationsWithTypesSelector(state)).toEqualImmutable(fromJS([]))
    })
    it('returns allegations when allegations is not blank', () => {
      const allegationsForm = [{
        id: 1,
        victimId: '123abc',
        perpetratorId: 'cba321',
        allegationTypes: ['something'],
      }]
      const state = fromJS({
        allegationsForm})
      expect(getAllegationsWithTypesSelector(state)).toEqualImmutable(fromJS([{
        id: 1,
        victimId: '123abc',
        perpetratorId: 'cba321',
        allegationTypes: ['something'],
      }]))
    })
  })
})
