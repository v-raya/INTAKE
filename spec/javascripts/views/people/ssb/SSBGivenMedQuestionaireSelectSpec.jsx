import React from 'react'
import {shallow} from 'enzyme'
import SSBGivenMedQuestionaireSelect from 'views/people/ssb/SSBGivenMedQuestionaireSelect'

describe('SSBGivenMedQuestionaireSelect', () => {
  const render = (props) => shallow(<SSBGivenMedQuestionaireSelect {...props}/>)

  let root
  let onChange

  beforeEach(() => {
    onChange = jasmine.createSpy('onChange')
    root = render({
      value: 'immediate',
      onChange,
    })
  })

  it('renders a select field', () => {
    const select = root.find('SelectField')
    expect(select.props().label).toEqual('Parent/Guardian Provided Medical Questionaire')
    expect(select.props().gridClassName).toEqual('col-md-4')
    expect(select.props().value).toEqual('immediate')
  })

  it('propagates changes', () => {
    const select = root.find('SelectField')
    const event = {target: {value: 'My weird value'}}
    select.props().onChange(event)
    expect(onChange).toHaveBeenCalledWith(event)
  })

  it('renders the approved responses', () => {
    const children = root.find('SelectField').props().children

    const valueIs = (label) => (child) => (child.props.children === label)

    expect(children.length).toEqual(5)

    expect(children.some(valueIs('Completed and Returned Immediately'))).toEqual(true)
    expect(children.some(valueIs('Completed and Mailed Back'))).toEqual(true)
    expect(children.some(valueIs('Provided/Never Returned'))).toEqual(true)
    expect(children.some(valueIs('Declined'))).toEqual(true)
    expect(children.some(valueIs('Unknown'))).toEqual(true)
  })
})
