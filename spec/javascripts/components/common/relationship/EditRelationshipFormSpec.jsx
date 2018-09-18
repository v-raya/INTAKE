import React from 'react'
import CheckboxField from 'common/CheckboxField'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import DateField from 'common/DateField'
import {shallow} from 'enzyme'

describe('EditRelationshipForm', () => {
  const props = {
    editFormRelationship: {
      absent_parent_indicator: false,
      client_id: 'ZXY123',
      end_date: '2010-10-01',
      id: '12345',
      relationship_type: 181,
      relative_id: 'ABC987',
      same_home_status: 'Y',
      start_date: '1999-10-01',
    },
    person: {
      name: 'Luke Skywalker',
      age: '20 yrs',
      gender: 'Male',
      gender_code: 'M',
    },
    relationship: {
      absent_parent_code: 'Y',
      name: 'Darth Vader',
      age: '30 yrs',
      gender: 'Male',
      gender_code: 'M',
      same_home_code: 'N',
      type_code: '210',
    },
  }
  const render = ({
    onChange = () => {},
    ...props
  } = {}) => shallow(<EditRelationshipForm onChange={onChange} {...props}/>)

  it('renders a table', () => {
    expect(render(props).find('table').length).toBe(1)
  })
  it('renders a select field', () => {
    expect(render(props).find('select').length).toBe(1)
  })
  it('renders two checkboxes', () => {
    expect(render(props).find(CheckboxField).length).toBe(2)
  })
  it('renders two date fields', () => {
    expect(render(props).find(DateField).length).toBe(2)
  })
  it('renders the person props and relationship props in the table with the gender key map', () => {
    const element = render(props).find('ul')
    expect(element.first().find('li').first().text()).toEqual('Luke Skywalker')
    expect(element.first().find('li').at(1).text()).toEqual('20 yrs')
    expect(element.first().find('li').last().text()).toEqual('Male')
    expect(element.last().find('li').first().text()).toEqual('Darth Vader')
    expect(element.last().find('li').at(1).text()).toEqual('30 yrs')
    expect(element.last().find('li').last().text()).toEqual('Male')
  })

  describe('absent parent checkbox', () => {
    it('disables the absent parent checkbox when it does not matches father/mother/parent', () => {
      expect(render(props).find('#absent_parent_indicator').prop('disabled')).toBe(true)
    })
    it('enables the absent parent checkbox when it matches father/mother/parent', () => {
      expect(
        render({
          ...props,
          editFormRelationship: {
            ...props.editFormRelationship,
            relationship_type: 285, //Son/Father (Birth)
          },
        })
          .find('#absent_parent_indicator')
          .prop('disabled'))
        .toBe(false)
    })
  })
  describe('calls onChange when changed', () => {
    const onChange = jasmine.createSpy('onChange')
    it('expects relationship type to change', () => {
      render({onChange, ...props})
        .find('#edit_relationship')
        .simulate('change', {target: {value: '808'}})
      expect(onChange).toHaveBeenCalledWith('relationship_type', 808)
    })
    it('expects same home status to change', () => {
      render({onChange, ...props})
        .find('#same_home_status')
        .simulate('change', {target: {value: 'Y'}})
      expect(onChange).toHaveBeenCalledWith('same_home_status', 'N')
    })
    it('expects parent whereabout unknown to change', () => {
      render({onChange, ...props})
        .find('#absent_parent_indicator')
        .simulate('change', {target: {checked: true}})
      expect(onChange).toHaveBeenCalledWith('absent_parent_indicator', true)
    })
    it('expects start date to change', () => {
      render({onChange, ...props})
        .find('#relationship_start_date')
        .simulate('change', '2016-08-13T10:00:00.000Z')
      expect(onChange).toHaveBeenCalledWith('start_date', '2016-08-13T10:00:00.000Z')
    })
    it('expects end date to change', () => {
      render({onChange, ...props})
        .find('#relationship_end_date')
        .simulate('change', '2016-08-13T10:00:00.000Z')
      expect(onChange).toHaveBeenCalledWith('end_date', '2016-08-13T10:00:00.000Z')
    })
  })
})
