import React from 'react'
import SearchByAddress from 'common/SearchByAddress'
import {shallow} from 'enzyme'

describe('SearchByAddress', () => {
  const render = ({onSubmit = () => {}, toggleAddressSearch = () => {}, ...props} = {}) => (
    shallow(<SearchByAddress onSubmit={onSubmit} toggleAddressSearch={toggleAddressSearch} {...props} />)
  )
  describe('when isAddressIncluded flag is false', () => {
    it('renders only Include Address checkbox', () => {
      const searchByAddress = render({isAddressIncluded: false})
      const root = searchByAddress.find('CheckboxField')

      expect(root.props().id).toEqual('include-address')
      expect(root.props().label).toEqual('Include Address')
      expect(searchByAddress.find('InputField').exists()).toBe(false)
      expect(searchByAddress.find('button').exists()).toBe(false)
    })
  })
  describe('when isAddressIncluded flag is true', () => {
    it('renders Include Address checkbox and Address row', () => {
      const searchByAddress = render({isAddressIncluded: true})

      const root = searchByAddress.find('CheckboxField')
      expect(root.props().id).toEqual('include-address')
      expect(root.props().label).toEqual('Include Address')
      expect(searchByAddress.find('AddressWithSearch').exists()).toEqual(true)
    })

    it('passes the selected county to AddressWithSearch', () => {
      const searchByAddress = render({searchCounty: 'San Francisco', isAddressIncluded: true})
      expect(
        searchByAddress.find('AddressWithSearch').props().searchCounty
      ).toEqual('San Francisco')
    })
  })
})
