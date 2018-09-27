import React from 'react'
import {shallow} from 'enzyme'
import PersonEthnicityForm from 'views/people/PersonEthnicityForm'

describe('PersonEthnicityForm', () => {
  const renderPersonEthnicityForm = (props) =>
    shallow(<PersonEthnicityForm {...props} />, {disableLifecycleMethods: true})

  it('renders the ethnicity fieldset with a legend', () => {
    const component = renderPersonEthnicityForm({})
    expect(component.html()).toContain('<legend class="legend-label">Hispanic/Latino Origin</legend>')
  })

  describe('Yes checkbox', () => {
    it('renders a check box with the proper id for Yes', () => {
      const component = renderPersonEthnicityForm({personId: '123'})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      expect(yesBox.exists()).toEqual(true)
      expect(yesBox.props().id).toEqual('123-ethnicity-yes')
    })

    it('sets checked to true if latinoOrigin is Yes', () => {
      const component = renderPersonEthnicityForm({latinoOrigin: 'Yes'})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      expect(yesBox.props().checked).toEqual(true)
    })

    it('sets checked to false if latinoOrigin is not Yes', () => {
      const component = renderPersonEthnicityForm({latinoOrigin: ''})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      expect(yesBox.props().checked).toEqual(false)
    })

    it('calls onChange with the proper value when checked', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = renderPersonEthnicityForm({onChange})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      yesBox.simulate('change', {target: {checked: true}})
      expect(onChange).toHaveBeenCalledWith('hispanic_latino_origin', 'Yes')
    })

    it('calls onChange with the proper value and clears ethnicity detail when unchecked', () => {
      const onChange = jasmine.createSpy('onChange')
      const component = renderPersonEthnicityForm({onChange})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      yesBox.simulate('change', {target: {checked: false}})
      expect(onChange).toHaveBeenCalledWith('hispanic_latino_origin', null)
      expect(onChange).toHaveBeenCalledWith('ethnicity_detail', [])
    })

    it('sets disabled to true if disableFields is true and the value is not Yes', () => {
      const component = renderPersonEthnicityForm({disableFields: true, latinoOrigin: ''})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      expect(yesBox.props().disabled).toEqual(true)
    })

    it('sets disabled to false if disableFields is false and the value is Yes', () => {
      const component = renderPersonEthnicityForm({disableFields: true, latinoOrigin: 'Yes'})
      const yesBox = component.find('CheckboxField[label="Yes"]')
      expect(yesBox.props().disabled).toEqual(false)
    })

    describe('ethnicityDetailOptions select field', () => {
      it('does not render if latinoOrigin is not set to Yes', () => {
        const component = renderPersonEthnicityForm({latinoOrigin: ''})
        const detailSelect = component.find('SelectField')
        expect(detailSelect.exists()).toEqual(false)
      })

      it('renders with no label if latinoOrigin is set to Yes', () => {
        const component = renderPersonEthnicityForm({latinoOrigin: 'Yes', personId: '123'})
        const detailSelect = component.find('SelectField')
        expect(detailSelect.exists()).toEqual(true)
        expect(detailSelect.props().label).toEqual('')
        expect(detailSelect.props().value).toEqual('')
        expect(detailSelect.props().id).toEqual('participant-123-ethnicity-detail')
        expect(detailSelect.props().ariaLabel).toEqual('participant-123-ethnicity-detail')
      })

      it('sets the value of the select to the current ethnicityDetail', () => {
        const component = renderPersonEthnicityForm({latinoOrigin: 'Yes', ethnicityDetail: 'Hispanic'})
        const detailSelect = component.find('SelectField')
        expect(detailSelect.exists()).toEqual(true)
        expect(detailSelect.props().value).toEqual('Hispanic')
      })

      it('calls onChange when an item is selected', () => {
        const onChange = jasmine.createSpy('onChange')
        const component = renderPersonEthnicityForm({latinoOrigin: 'Yes', onChange})
        const detailSelect = component.find('SelectField')
        detailSelect.simulate('change', {target: {value: 'Hispanic'}})
        expect(onChange).toHaveBeenCalledWith('ethnicity_detail', ['Hispanic'])
      })

      it('renders ethnicityDetailOptions as options for the select', () => {
        const component = renderPersonEthnicityForm({latinoOrigin: 'Yes'})
        const detailSelect = component.find('SelectField')
        const detailSelectOptions = detailSelect.children()
        expect(detailSelectOptions.at(0).props().value).toEqual('')
        expect(detailSelectOptions.at(1).props().value).toEqual('Hispanic')
        expect(detailSelectOptions.at(1).children().text()).toEqual('Hispanic')
        expect(detailSelectOptions.at(2).props().value).toEqual('Mexican')
        expect(detailSelectOptions.at(2).children().text()).toEqual('Mexican')
        expect(detailSelectOptions.at(3).props().value).toEqual('Central American')
        expect(detailSelectOptions.at(3).children().text()).toEqual('Central American')
        expect(detailSelectOptions.at(4).props().value).toEqual('South American')
        expect(detailSelectOptions.at(4).children().text()).toEqual('South American')
      })
    })
  })

  it('renders a check box for No', () => {
    const component = renderPersonEthnicityForm({personId: '123'})
    const declinedBox = component.find('EthnicityCheckbox').at(0)
    expect(declinedBox.props().ethnicity).toEqual('No')
  })
  it('renders a check box for Unknown', () => {
    const component = renderPersonEthnicityForm({personId: '123'})
    const declinedBox = component.find('EthnicityCheckbox').at(1)
    expect(declinedBox.props().ethnicity).toEqual('Unknown')
  })
  it('renders a check box for Abandoned', () => {
    const component = renderPersonEthnicityForm({personId: '123'})
    const declinedBox = component.find('EthnicityCheckbox').at(2)
    expect(declinedBox.props().ethnicity).toEqual('Abandoned')
  })
  it('renders a check box for Declined to answer', () => {
    const component = renderPersonEthnicityForm({personId: '123'})
    const declinedBox = component.find('EthnicityCheckbox').at(3)
    expect(declinedBox.props().ethnicity).toEqual('Declined to answer')
  })
})
