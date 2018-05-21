import SafelySurrenderedBabyForm from 'views/people/SafelySurrenderedBabyForm'
import React from 'react'
import {shallow} from 'enzyme'

describe('SafeleySurrenderedBabyForm', () => {
  const render = (props) => shallow(<SafelySurrenderedBabyForm {...props}/>)

  let root

  beforeEach(() => {
    root = render({
      surrenderedBy: 'Hagrid',
      relationToChild: 'Groundskeeper',
      braceletId: 'Lightning',
      parentGuardGivenBraceletId: true,
      parentGuardProvMedicalQuestionaire: false,
      comments: 'Yer a wizard, Harry!',
      medQuestionaireReturnDate: '2001-11-14',
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
      const props = body.find('SelectField[label="Surrendered By"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('Hagrid')
    })

    it('renders Relationship to Surrendered Child', () => {
      const props = body.find('SelectField[label="Relationship to Surrendered Child"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('Groundskeeper')
    })

    it('renders Bracelet ID', () => {
      const props = body.find('InputField[label="Bracelet ID"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('Lightning')
    })

    it('renders Comments', () => {
      const props = body.find('InputField[label="Comments"]').props()
      expect(props.gridClassName).toEqual('col-md-12')
      expect(props.value).toEqual('Yer a wizard, Harry!')
    })

    it('renders Parent/Guardian Given Bracelet ID', () => {
      const props = body.find('SelectField[label="Parent/Guardian Given Bracelet ID"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('Yes')
    })

    it('renders Parent/Guardian Provided Medical Questionaire', () => {
      const props = body.find('SelectField[label="Parent/Guardian Provided Medical Questionaire"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('No')
    })

    it('renders Medical Questionaire Return Date', () => {
      const props = body.find('DateField[label="Medical Questionaire Return Date"]').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.value).toEqual('2001-11-14')
    })
  })
})
