import SafelySurrenderedBabyForm from 'views/people/ssb/SafelySurrenderedBabyForm'
import React from 'react'
import {shallow} from 'enzyme'

describe('SafeleySurrenderedBabyForm', () => {
  const render = (props) => shallow(<SafelySurrenderedBabyForm {...props}/>)

  let root
  let actions

  beforeEach(() => {
    actions = jasmine.createSpyObj('actions', ['onBlur', 'onChange'])
    root = render({
      surrendered_by: 'Hagrid',
      relation_to_child: 'Groundskeeper',
      bracelet_id: 'Lightning',
      parent_guardian_given_bracelet_id: 'yes',
      parent_guardian_provided_med_questionaire: 'no',
      comments: 'Yer a wizard, Harry!',
      med_questionaire_return_date: '2001-11-14',
      actions,
    })
  })

  it('renders a grouping header', () => {
    const header = root.find('GrouperHeading')
    expect(header.props().text).toEqual('Safely Surrendered Baby Information')
  })

  describe('body', () => {
    let body

    beforeEach(() => {
      body = root.find('.row')
    })

    it('is a row', () => {
      expect(body.props().className).toContain('row')
    })

    it('renders Surrendered By', () => {
      const props = body.find('InputField[label="Surrendered By"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.disabled).toEqual(true)
      expect(props.value).toEqual('Hagrid')
    })

    it('renders Relationship to Surrendered Child', () => {
      const props = body.find('SSBRelationSelect').props()
      expect(props.value).toEqual('Groundskeeper')
    })

    it('propagates changes to Relationship to Surrendered Child', () => {
      const props = body.find('SSBRelationSelect').props()
      props.onChange({target: {value: 'Mother'}})
      expect(actions.onChange).toHaveBeenCalledWith('relation_to_child', 'Mother')
    })

    it('renders Bracelet ID', () => {
      const props = body.find('InputField[label="Bracelet ID"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('Lightning')
    })

    it('propagates changes to Bracelet ID', () => {
      const bracelet_id = body.find('InputField[label="Bracelet ID"]')

      bracelet_id.props().onChange({target: {value: 'New Id'}})

      expect(actions.onChange).toHaveBeenCalledWith('bracelet_id', 'New Id')
    })

    it('renders Comments', () => {
      const formfield = body.find('FormField[label="Comments"]')
      expect(formfield.props().gridClassName).toEqual('col-md-12')
      expect(formfield.childAt(0).props().value).toEqual('Yer a wizard, Harry!')
    })

    it('propagates changes to Comments', () => {
      const formfield = body.find('FormField[label="Comments"]')
      const event = {target: {value: 'New Comments'}}

      formfield.find('textarea').simulate('change', event)

      expect(actions.onChange).toHaveBeenCalledWith('comments', 'New Comments')
    })

    it('renders Parent/Guardian Given Bracelet ID', () => {
      const props = body.find('SSBGivenBraceletSelect').props()
      expect(props.value).toEqual('yes')
    })

    it('propagates changes to Parent/Guardian Given Bracelet ID', () => {
      const props = body.find('SSBGivenBraceletSelect').props()
      props.onChange({target: {value: 'Unknown'}})
      expect(actions.onChange).toHaveBeenCalledWith('parent_guardian_given_bracelet_id', 'Unknown')
    })

    it('renders Parent/Guardian Provided Medical Questionaire', () => {
      const props = body.find('SSBGivenMedQuestionaireSelect').props()
      expect(props.value).toEqual('no')
    })

    it('propagates changes to Parent/Guardian Provided Medical Questionaire', () => {
      const props = body.find('SSBGivenMedQuestionaireSelect').props()
      props.onChange({target: {value: 'Unknown'}})
      expect(actions.onChange).toHaveBeenCalledWith('parent_guardian_provided_med_questionaire', 'Unknown')
    })

    it('renders Medical Questionaire Return Date', () => {
      const props = body.find('DateField[label="Medical Questionaire Return Date"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('2001-11-14')
    })

    it('propagates changes to Medical Questionaire Return Date', () => {
      const props = body.find('DateField[label="Medical Questionaire Return Date"]').props()
      props.onChange('2001-12-31')
      expect(actions.onChange).toHaveBeenCalledWith('med_questionaire_return_date', '2001-12-31')
    })
  })
})
