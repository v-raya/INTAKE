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
    expect(select.props().gridClassName).toEqual('col-md-4')
    expect(select.props().value).toEqual('Groundskeeper')
  })

  it('propagates changes', () => {
    const select = root.find('SelectField')
    const event = {target: {value: 'My weird value'}}
    select.props().onChange(event)
    expect(onChange).toHaveBeenCalledWith(event)
  })
})
