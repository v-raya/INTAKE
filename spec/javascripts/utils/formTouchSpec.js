import {toUntouchedObject} from 'utils/formTouch'
import * as matchers from 'jasmine-immutable-matchers'
import {fromJS} from 'immutable'

describe('formTouch', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('toUntouchedObject', () => {
    const obj = {
      aaa: 'Hello',
      bbb: 'Foo Bar',
      ccc: 'Goodbye',
    }
    it('wraps fields', () => {
      const fields = ['aaa', 'bbb', 'ccc']
      expect(toUntouchedObject(fields, obj)).toEqualImmutable(fromJS({
        aaa: {value: 'Hello', touched: false},
        bbb: {value: 'Foo Bar', touched: false},
        ccc: {value: 'Goodbye', touched: false},
      }))
    })
    it('filters out invalid fields', () => {
      const fields = ['aaa', 'bbb']
      expect(toUntouchedObject(fields, obj)).toEqualImmutable(fromJS({
        aaa: {value: 'Hello', touched: false},
        bbb: {value: 'Foo Bar', touched: false},
      }))
    })
  })
})
