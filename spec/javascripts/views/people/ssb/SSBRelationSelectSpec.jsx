import React from 'react'
import {shallow} from 'enzyme'
import SSBRelationSelect from 'views/people/ssb/SSBRelationSelect'

describe('SSBRelationSelect', () => {
  const render = (props) => shallow(<SSBRelationSelect {...props}/>)

  let root
  let onChange

  beforeEach(() => {
    onChange = jasmine.createSpy('onChange')
    root = render({
      value: 'Groundskeeper',
      onChange,
    })
  })

  it('renders a select field', () => {
    const select = root.find('SelectField')
    expect(select.props().label).toEqual('Relationship to Surrendered Child')
    expect(select.props().gridClassName).toEqual('col-md-4')
    expect(select.props().value).toEqual('Groundskeeper')
  })

  it('propagates changes', () => {
    const select = root.find('SelectField')
    const event = {target: {value: 'My weird value'}}
    select.props().onChange(event)
    expect(onChange).toHaveBeenCalledWith(event)
  })

  it('renders the approved list of relationships for SSBs', () => {
    const children = root.find('SelectField').props().children

    const relationIs = (label) => (child) => (child.props.children === label)

    expect(children.length).toEqual(17)

    expect(children.some(relationIs('Parents'))).toEqual(true)
    expect(children.some(relationIs('Mother (Birth or Adoptive)'))).toEqual(true)
    expect(children.some(relationIs('Father (Birth or Adoptive)'))).toEqual(true)
    expect(children.some(relationIs('Legal Guardian'))).toEqual(true)
    expect(children.some(relationIs('Grandparents'))).toEqual(true)
    expect(children.some(relationIs('Grandmother'))).toEqual(true)
    expect(children.some(relationIs('Grandfather'))).toEqual(true)
    expect(children.some(relationIs('Sister'))).toEqual(true)
    expect(children.some(relationIs('Brother'))).toEqual(true)
    expect(children.some(relationIs('Stepmother'))).toEqual(true)
    expect(children.some(relationIs('Stepfather'))).toEqual(true)
    expect(children.some(relationIs('Aunt'))).toEqual(true)
    expect(children.some(relationIs('Uncle'))).toEqual(true)
    expect(children.some(relationIs('Other Relative'))).toEqual(true)
    expect(children.some(relationIs('Indian Custodian'))).toEqual(true)
    expect(children.some(relationIs('Nonrelative'))).toEqual(true)
    expect(children.some(relationIs('Unable to Identify'))).toEqual(true)
  })
})
