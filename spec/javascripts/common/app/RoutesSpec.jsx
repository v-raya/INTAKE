import {shallow} from 'enzyme'
import {createHistory} from 'history'
import React from 'react'
import {createStore} from 'redux'
import {Routes} from 'common/app/Routes'

describe('Routes', () => {
  it('renders a Redux store provider', () => {
    const root = shallow(
      <Routes
        store={createStore(() => ({}), {})}
        history={createHistory()}
        snapshotActive={false}
        screeningActive={false}
      />
    )

    expect(root.find('Provider').exists()).toEqual(true)
  })
})
