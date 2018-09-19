import React from 'react'
import AddressWithSearch from 'common/AddressWithSearch'
import {shallow} from 'enzyme'

describe('AddressWithSearch', () => {
  const render = ({
    onChangeAddress = () => {},
    onChangeCity = () => {},
    onChangeCounty = () => {},
    onSubmit = () => {},
    ...props
  } = {}) => (
    shallow(
      <AddressWithSearch
        onChangeAddress={onChangeAddress}
        onChangeCity={onChangeCity}
        onChangeCounty={onChangeCounty}
        onSubmit={onSubmit}
        {...props}
      />
    )
  )

  it('renders county select', () => {
    const component = render()
    const countySelect = component.find('CountyNameSelect')
    expect(countySelect.props().id).toEqual('search-county')
    expect(countySelect.props().value).toEqual('')
  })

  it('renders county select when a county is selected', () => {
    const component = render({searchCounty: 'Contra Costa'})
    const countySelect = component.find('CountyNameSelect')
    expect(countySelect.props().id).toEqual('search-county')
    expect(countySelect.props().value).toEqual('Contra Costa')
  })

  it('renders city input field with label City', () => {
    const city = render({searchCity: 'Damascus'})
      .find('InputField[label="City"]')
    expect(city.props().id).toEqual('search-city')
    expect(city.props().value).toEqual('Damascus')
  })

  it('renders address input field with label Address', () => {
    const address = render({searchAddress: '1600 Pennsylvania Ave NW'})
      .find('InputField[label="Address"]')
    expect(address.props().id).toEqual('search-address')
    expect(address.props().value).toEqual('1600 Pennsylvania Ave NW')
  })

  it('renders button for search', () => {
    const component = render()
    expect(component.find('button').text()).toEqual('Search')
  })

  describe('when there is no search term', () => {
    it('disables the search button when there is no street address', () => {
      const component = render({searchCounty: 'Yolo', searchCity: 'Davis'})
      expect(component.find('button').props().disabled).toBeTruthy()
    })

    it('enables the search button when there is a street address', () => {
      const component = render({searchAddress: 'Main'})
      expect(component.find('button').props().disabled).toBeFalsy()
    })
  })

  describe('when there is an existing search term', () => {
    it('enables the search button even when there is no address info', () => {
      const component = render({searchTerm: 'Yoko'})
      expect(component.find('button').props().disabled).toBeFalsy()
    })

    it('disables the search button when the search term is too short', () => {
      const component = render({searchTerm: 'Y'})
      expect(component.find('button').props().disabled).toBeTruthy()
    })

    it('strips leading whitespace when deciding to enable search', () => {
      const component = render({searchTerm: ' Y'})
      expect(component.find('button').props().disabled).toBeTruthy()
    })
  })

  it('calls onSubmit when search button is clicked', () => {
    const onSubmit = jasmine.createSpy('onClick')
    const component = render({onSubmit})
    const searchButton = component.find('.btn-primary')
    searchButton.simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('calls onChangeCounty when new county is selected', () => {
    const onChangeCounty = jasmine.createSpy('onChangeCounty')
    const component = render({onChangeCounty})
    component.find('CountyNameSelect').props().onChange('Inyo')
    expect(onChangeCounty).toHaveBeenCalledWith('Inyo')
  })

  it('calls onChangeCity when new city is entered', () => {
    const onChangeCity = jasmine.createSpy('onChangeCity')
    const component = render({onChangeCity})
    component.find('#search-city').props().onChange({target: {value: 'Metropolis'}})
    expect(onChangeCity).toHaveBeenCalledWith('Metropolis')
  })

  it('calls onChangeAddress when new address is entered', () => {
    const onChangeAddress = jasmine.createSpy('onChangeAddress')
    const component = render({onChangeAddress})
    component.find('#search-address').props().onChange({target: {value: '1 Infinite Loop'}})
    expect(onChangeAddress).toHaveBeenCalledWith('1 Infinite Loop')
  })
})
