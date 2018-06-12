import React from 'react'
import ScreeningRow from 'screenings/ScreeningRow'
import {shallow} from 'enzyme'

describe('ScreeningRow', () => {
  describe('when referral id is present', () => {
    it('renders link to screening with name', () => {
      const props = {id: '1', referralId: '456', name: 'My Screening Name'}
      const view = shallow(<ScreeningRow {...props} />, {disableLifecycleMethods: true})
      const link = view.find('Link')
      expect(link.props().to).toEqual('/screenings/1')
      expect(link.html()).toEqual('<a>My Screening Name</a>')
    })

    it('renders link to screening with screening id when name is not present', () => {
      const props = {id: '1', referralId: '456', name: null}
      const view = shallow(<ScreeningRow {...props} />, {disableLifecycleMethods: true})
      const link = view.find('Link')
      expect(link.props().to).toEqual('/screenings/1')
      expect(link.html()).toEqual('<a>456</a>')
    })

    it('renders screening status when available', () => {
      const props = {id: '1', referralId: '456', name: null, screening_status: 'open'}
      const view = shallow(<ScreeningRow {...props} />, {disableLifecycleMethods: true})
      expect(view.html()).toContain('open')
    })
  })
})
