import React from 'react'
import ScreeningsTable from 'screenings/ScreeningsTable'
import {shallow} from 'enzyme'

describe('ScreeningsTable', () => {
  const view = shallow(<ScreeningsTable />, {disableLifecycleMethods: true})

  it('renders BootstrapTable for screenings', () => {
    expect(view.find('BootstrapTable').length).toBe(1)
  })

  it('has a TableHeaderColumn', () => {
    expect(view.find('TableHeaderColumn').length).toBe(5)
  })
})
