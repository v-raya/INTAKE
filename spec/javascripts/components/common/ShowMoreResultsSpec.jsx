import ShowMoreResults from 'common/ShowMoreResults'
import React from 'react'
import {shallow} from 'enzyme'

describe('ShowMoreResults', () => {
  const button = shallow(
    <ShowMoreResults />, {disableLifecycleMethods: true}
  )

  it("renders the 'show more results' button", () => {
    expect(button.text()).toContain('Show more results')
  })
})
