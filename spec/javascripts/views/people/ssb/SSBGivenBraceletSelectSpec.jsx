import React from 'react'
import {shallow} from 'enzyme'
import SSBGivenBraceletSelect from 'views/people/ssb/SSBGivenBraceletSelect'

describe('SSBGivenBraceletSelect', () => {
  const render = (props) => shallow(<SSBGivenBraceletSelect {...props}/>)

  let root
  let onChange

  beforeEach(() => {
    onChange = jasmine.createSpy('onChange')
    root = render({
      value: 'no',
      onChange,
    })
  })

  it('renders a select field', () => {
    const select = root.find('SelectField')
    expect(select.props().label).toEqual('Parent/Guardian Given Bracelet ID')
    expect(select.props().gridClassName).toEqual('col-md-4')
    expect(select.props().value).toEqual('no')
  })

  it('propagates changes', () => {
    const select = root.find('SelectField')
    const event = {target: {value: 'My weird value'}}
    select.props().onChange(event)
    expect(onChange).toHaveBeenCalledWith(event)
  })

  it('renders the approved list of responses', () => {
    const children = root.find('SelectField').props().children

    const valueIs = (label) => (child) => (child.props.children === label)

    expect(children.length).toEqual(4)

    expect(children.some(valueIs('Yes'))).toEqual(true)
    expect(children.some(valueIs('No'))).toEqual(true)
    expect(children.some(valueIs('Attempted'))).toEqual(true)
    expect(children.some(valueIs('Unknown'))).toEqual(true)
  })
})
