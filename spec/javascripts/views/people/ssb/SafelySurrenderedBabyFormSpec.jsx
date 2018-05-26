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
      surrenderedBy: 'Hagrid',
      relationToChild: 'Groundskeeper',
      braceletId: 'Lightning',
      parentGuardGivenBraceletId: 'yes',
      parentGuardProvMedicalQuestionaire: 'no',
      comments: 'Yer a wizard, Harry!',
      medQuestionaireReturnDate: '2001-11-14',
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
      expect(actions.onChange).toHaveBeenCalledWith('relationToChild', 'Mother')
    })

    it('renders Bracelet ID', () => {
      const props = body.find('InputField[label="Bracelet ID"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('Lightning')
    })

    it('propagates changes to Bracelet ID', () => {
      const braceletId = body.find('InputField[label="Bracelet ID"]')

      braceletId.props().onChange({target: {value: 'New Id'}})

      expect(actions.onChange).toHaveBeenCalledWith('braceletId', 'New Id')
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
      expect(actions.onChange).toHaveBeenCalledWith('parentGuardGivenBraceletId', 'Unknown')
    })

    it('renders Parent/Guardian Provided Medical Questionaire', () => {
      const props = body.find('SSBGivenMedQuestionaireSelect').props()
      expect(props.value).toEqual('no')
    })

    it('propagates changes to Parent/Guardian Provided Medical Questionaire', () => {
      const props = body.find('SSBGivenMedQuestionaireSelect').props()
      props.onChange({target: {value: 'Unknown'}})
      expect(actions.onChange).toHaveBeenCalledWith('parentGuardProvMedicalQuestionaire', 'Unknown')
    })

    it('renders Medical Questionaire Return Date', () => {
      const props = body.find('DateField[label="Medical Questionaire Return Date"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('2001-11-14')
    })

    it('propagates changes to Medical Questionaire Return Date', () => {
      const props = body.find('DateField[label="Medical Questionaire Return Date"]').props()
      props.onChange('2001-12-31')
      expect(actions.onChange).toHaveBeenCalledWith('medQuestionaireReturnDate', '2001-12-31')
    })
  })
})
