import React from 'react'
import SearchByAddress from 'common/SearchByAddress'
import {shallow} from 'enzyme'

describe('SearchByAddress', () => {
  describe('when searchAddress flag is false', () => {
    const props = {
      searchAddress: false,
    }

    const searchByAddress = shallow(
      <SearchByAddress {...props} />, {disableLifecycleMethods: true}
    )

    it('renders only Include Address checkbox', () => {
      expect(searchByAddress.find('CheckboxField').props().id).toEqual('include-address')
      expect(searchByAddress.find('CheckboxField').props().label).toEqual('Include Address')
      expect(searchByAddress.find('CheckboxField').props().value).toEqual(false)
      expect(searchByAddress.find('InputField').length).toEqual(0)
      expect(searchByAddress.find('button').length).toEqual(0)
    })
  })
  describe('when searchAddress flag is true', () => {
    const props = {
      searchAddress: true,
    }

    const searchByAddress = shallow(
      <SearchByAddress {...props} />, {disableLifecycleMethods: true}
    )

    it('renders Include Address checkbox, inputfield and search button', () => {
      expect(searchByAddress.find('CheckboxField').props().id).toEqual('include-address')
      expect(searchByAddress.find('CheckboxField').props().label).toEqual('Include Address')
      expect(searchByAddress.find('CheckboxField').props().value).toEqual(true)
      expect(searchByAddress.html())
        .toContain('<input type="text" id="search-address"/></div><div></div></div><div class="col-md-3"><label> </label><button class="btn btn-primary">Search</button>')
    })
  })
})
