import React from 'react'
import {SearchByAddress} from 'common/SearchByAddress'
import {shallow} from 'enzyme'
import * as IntakeConfig from 'common/config'

describe('SearchByAddress', () => {
  const render = ({
    location = {pathname: '/screenings/1/edit'},
    onChangeAddress = () => {},
    onChangeCity = () => {},
    onChangeCounty = () => {},
    onSubmit = () => {},
    toggleAddressSearch = () => {},
    ...props
  } = {}) => (
    shallow(
      <SearchByAddress
        location={location}
        onChangeAddress={onChangeAddress}
        onChangeCity={onChangeCity}
        onChangeCounty={onChangeCounty}
        onSubmit={onSubmit}
        toggleAddressSearch={toggleAddressSearch}
        {...props}
      />
    )
  )

  beforeEach(() => {
    spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(true)
  })
  describe('when is not Hotline', () => {
    it('renders an empty string', () => {
      IntakeConfig.isFeatureActive.and.returnValue(false)
      const searchByAddress = render({isAddressIncluded: false})
      expect(searchByAddress.html()).toEqual(null)
    })
  })
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

    it('passes the current search term to AddressWithSearch', () => {
      const searchByAddress = render({searchTerm: 'Odlaw', isAddressIncluded: true})
      expect(
        searchByAddress.find('AddressWithSearch').props().searchTerm
      ).toEqual('Odlaw')
    })

    it('passes the entered address to AddressWithSearch', () => {
      const searchByAddress = render({searchAddress: 'Yellow Brick Road', isAddressIncluded: true})
      expect(
        searchByAddress.find('AddressWithSearch').props().searchAddress
      ).toEqual('Yellow Brick Road')
    })

    it('calls onChangeAddress when new address is entered', () => {
      const onChangeAddress = jasmine.createSpy('onChangeAddress')
      const searchByAddress = render({onChangeAddress, isAddressIncluded: true})

      searchByAddress.find('AddressWithSearch').props().onChangeAddress('221B Baker St')

      expect(onChangeAddress).toHaveBeenCalledWith('221B Baker St')
    })

    it('passes the entered city to AddressWithSearch', () => {
      const searchByAddress = render({searchCity: 'San Fransokyo', isAddressIncluded: true})
      expect(
        searchByAddress.find('AddressWithSearch').props().searchCity
      ).toEqual('San Fransokyo')
    })

    it('calls onChangeCity when new city is selected', () => {
      const onChangeCity = jasmine.createSpy('onChangeCity')
      const searchByAddress = render({onChangeCity, isAddressIncluded: true})

      searchByAddress.find('AddressWithSearch').props().onChangeCity('Gotham')

      expect(onChangeCity).toHaveBeenCalledWith('Gotham')
    })

    it('passes the selected county to AddressWithSearch', () => {
      const searchByAddress = render({searchCounty: 'San Francisco', isAddressIncluded: true})
      expect(
        searchByAddress.find('AddressWithSearch').props().searchCounty
      ).toEqual('San Francisco')
    })

    it('calls onChangeCounty when new county is selected', () => {
      const onChangeCounty = jasmine.createSpy('onChangeCounty')
      const searchByAddress = render({onChangeCounty, isAddressIncluded: true})

      searchByAddress.find('AddressWithSearch').props().onChangeCounty('Solano')

      expect(onChangeCounty).toHaveBeenCalledWith('Solano')
    })
  })
})
