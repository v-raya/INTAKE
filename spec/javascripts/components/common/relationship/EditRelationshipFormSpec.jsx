import React from 'react'
import CheckboxField from 'common/CheckboxField'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import DateField from 'common/DateField'
import {shallow} from 'enzyme'

describe('EditRelationshipForm', () => {
  const props = {
    person: {
      name: 'Luke Skywalker',
      age: 20,
      age_unit: 'Y',
      gender: 'M',
    },
    relationship: {
      absent_parent_code: 'Y',
      name: 'Darth Vader',
      related_person_age: '30',
      related_person_age_unit: 'Y',
      gender: 'M',
      secondaryRelationship: 'Father',
      same_home_code: 'N',
      type_code: '210',
    },
  }
  const renderEditRelationshipForm = (props) => shallow(<EditRelationshipForm {...props}/>)

  it('renders a table', () => {
    expect(renderEditRelationshipForm(props).find('table').length).toBe(1)
  })

  it('renders a select field', () => {
    expect(renderEditRelationshipForm(props).find('select').length).toBe(1)
  })

  it('renders two checkboxes', () => {
    expect(renderEditRelationshipForm(props).find(CheckboxField).length).toBe(2)
  })

  it('renders two date fields', () => {
    expect(renderEditRelationshipForm(props).find(DateField).length).toBe(2)
  })

  it('renders the person props and relationship props in the table with the gender key map', () => {
    const component = renderEditRelationshipForm(props)

    expect(component.find('ul').first().find('li').first().text()).toEqual('Luke Skywalker')
    expect(component.find('ul').first().find('li').at(1).text()).toEqual('20 yrs')
    expect(component.find('ul').first().find('li').last().text()).toEqual('Male')
    expect(component.find('ul').last().find('li').first().text()).toEqual('Darth Vader')
    expect(component.find('ul').last().find('li').at(1).text()).toEqual('30 yrs')
    expect(component.find('ul').last().find('li').last().text()).toEqual('Male')
  })

  describe('absent parent checkbox', () => {
    const propsDisableCheckbox = {
      person: {
        name: 'Luke Skywalker',
        age: 20,
        age_unit: 'Y',
        gender: 'M',
      },
      relationship: {
        absent_parent_code: 'Y',
        name: 'Darth Vader',
        related_person_age: '30',
        related_person_age_unit: 'Y',
        gender: 'M',
        secondaryRelationship: 'No Relation',
        same_home_code: 'N',
        type_code: '175',
      },
    }
    const propsEnablesCheckbox = {
      person: {
        name: 'Luke Skywalker',
        age: 20,
        age_unit: 'Y',
        gender: 'M',
      },
      relationship: {
        absent_parent_code: 'Y',
        name: 'Darth Vader',
        related_person_age: '30',
        related_person_age_unit: 'Y',
        gender: 'M',
        secondaryRelationship: 'Father (Birth)',
        same_home_code: 'N',
        type_code: '190',
      },
    }
    it('disables the absent parent checkbox when it does not matches father/mother/parent', () => {
      expect(
        renderEditRelationshipForm(propsDisableCheckbox)
          .find('#absent_parent_code')
          .prop('disabled'))
        .toBe(true)
    })
    it('enables the absent parent checkbox when it matches father/mother/parent', () => {
      expect(
        renderEditRelationshipForm(propsEnablesCheckbox)
          .find('#absent_parent_code')
          .prop('disabled'))
        .toBe(false)
    })
  })
})
