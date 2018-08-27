import React from 'react'
import AddressWithSearch from 'common/AddressWithSearch'
import {shallow} from 'enzyme'

describe('AddressWithSearch', () => {
  const addressWithSearch = shallow(
    <AddressWithSearch />, {disableLifecycleMethods: true}
  )

  it("renders address input field with id 'search-address' and label 'Address'", () => {
    expect(addressWithSearch.find('InputField').props().id).toEqual('search-address')
    expect(addressWithSearch.find('InputField').props().label).toEqual('Address')
  })

  it('renders button for search', () => {
    expect(addressWithSearch.find('button').text()).toEqual('Search')
  })
})
