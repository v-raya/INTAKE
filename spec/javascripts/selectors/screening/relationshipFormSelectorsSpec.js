import {fromJS} from 'immutable'
import {selectRelationship} from 'selectors/screening/relationshipFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('relationshipsSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const emptyState = fromJS({relationship: {}})
  const relationship = {
    absent_parent_indicator: true,
    client_id: 'ZXY123',
    end_date: '2010-10-01',
    id: '12345',
    relationship_type: 190,
    relative_id: 'ABC987',
    same_home_status: 'Y',
    start_date: '1999-10-01',
  }

  it('returns a an empty object', () => {
    expect(selectRelationship(emptyState)).toEqualImmutable(fromJS({}))
  })

  it('returns a relationship', () => {
    const state = fromJS({relationship})
    expect(selectRelationship(state)).toEqualImmutable(
      fromJS({
        absent_parent_indicator: true,
        client_id: 'ZXY123',
        end_date: '2010-10-01',
        id: '12345',
        relationship_type: 190,
        relative_id: 'ABC987',
        same_home_status: 'Y',
        start_date: '1999-10-01',
      })
    )
  })
})
