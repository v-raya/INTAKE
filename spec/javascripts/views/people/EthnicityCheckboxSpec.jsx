import React from 'react'
import {shallow} from 'enzyme'
import EthnicityCheckbox from 'views/people/EthnicityCheckbox'

describe('EthnicityCheckbox', () => {
  const render = ({
    disableFields,
    ethnicity = 'Klingon',
    personId,
    selectedEthnicity,
    onChange = () => {},
  }) => shallow(
    <EthnicityCheckbox
      disableFields={disableFields}
      ethnicity={ethnicity}
      personId={personId}
      selectedEthnicity={selectedEthnicity}
      onChange={onChange}
    />
  )

  it('renders a check box whith the proper id', () => {
    const component = render({ethnicity: 'Declined To Answer', personId: '123'})
    const box = component.find('CheckboxField[label="Declined To Answer"]')
    expect(box.exists()).toEqual(true)
    expect(box.props().id).toEqual('123-ethnicity-declined-to-answer')
  })

  it('sets checked to true if selected ethnicity matches', () => {
    const component = render({ethnicity: 'Unknown', selectedEthnicity: 'Unknown'})
    const box = component.find('CheckboxField')
    expect(box.props().checked).toEqual(true)
  })

  it('sets checked to false if selected ethnicity does not match', () => {
    const component = render({ethnicity: 'Abandoned', selectedEthnicity: 'Unknown'})
    const box = component.find('CheckboxField')
    expect(box.props().checked).toEqual(false)
  })

  it('calls onChange with the proper value when checked', () => {
    const onChange = jasmine.createSpy('onChange')
    const box = render({onChange, ethnicity: 'Abandoned'}).find('CheckboxField')
    box.simulate('change', {target: {checked: true}})
    expect(onChange).toHaveBeenCalledWith('hispanic_latino_origin', 'Abandoned')
  })

  it('calls onChange with the proper value when unchecked', () => {
    const onChange = jasmine.createSpy('onChange')
    const box = render({onChange, ethnicity: 'Abandoned'}).find('CheckboxField')
    box.simulate('change', {target: {checked: false}})
    expect(onChange).toHaveBeenCalledWith('hispanic_latino_origin', null)
  })

  it('sets disabled to true if disableFields is true and ethnicity not selected', () => {
    const component = render({disableFields: true, ethnicity: 'Abandoned', selectedEthnicity: 'Unknown'})
    const box = component.find('CheckboxField')
    expect(box.props().disabled).toEqual(true)
  })

  it('sets disabled to false if disableFields is true but ethnicity is selected', () => {
    const component = render({disableFields: true, ethnicity: 'Abandoned', selectedEthnicity: 'Abandoned'})
    const box = component.find('CheckboxField')
    expect(box.props().disabled).toEqual(false)
  })

  it('sets disabled to false if disableFields is false', () => {
    const component = render({disableFields: false, ethnicity: 'Abandoned', selectedEthnicity: 'Unknown'})
    const abandonedBox = component.find('CheckboxField')
    expect(abandonedBox.props().disabled).toEqual(false)
  })
})
