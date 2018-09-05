import React from 'react'
import SearchByAddress from 'common/SearchByAddress'
import {shallow} from 'enzyme'

describe('SearchByAddress', () => {
  describe('when isAddressIncluded flag is false', () => {
    it('renders only Include Address checkbox', () => {
      const render = ({onChange = () => {}, ...props} = {}) => (
        shallow(<SearchByAddress onChange={onChange} {...props} />)
      )
      const searchByAddress = render({isAddressIncluded: false})
      const root = searchByAddress.find('CheckboxField')

      expect(root.props().id).toEqual('include-address')
      expect(root.props().label).toEqual('Include Address')
      expect(root.props().checked).toEqual(false)
      expect(searchByAddress.find('InputField').exists()).toBe(false)
      expect(searchByAddress.find('button').exists()).toBe(false)
    })
  })
  describe('when isAddressIncluded flag is true', () => {
    it('renders Include Address checkbox, inputfield and search button', () => {
      const render = ({onChange = () => {}, ...props} = {}) => (
        shallow(<SearchByAddress onChange={onChange} {...props} />)
      )
      const searchByAddress = render({isAddressIncluded: true})

      const root = searchByAddress.find('CheckboxField')
      expect(root.props().id).toEqual('include-address')
      expect(root.props().label).toEqual('Include Address')
      expect(root.props().checked).toEqual(true)
      expect(searchByAddress.html())
        .toContain('<input type="text" id="search-address"/></div><div></div></div><div class="col-md-3 address-search"><button class="btn btn-primary">Search</button>')
    })
  })
})
