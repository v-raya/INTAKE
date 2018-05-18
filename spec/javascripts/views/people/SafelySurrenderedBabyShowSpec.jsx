import React from 'react'
import {shallow} from 'enzyme'
import SafelySurrenderedBabyShow from 'views/people/SafelySurrenderedBabyShow'

describe('SafelySurrenderedBabyShow', () => {
  const render = (props) => shallow(<SafelySurrenderedBabyShow {...props}/>)
  const findField = (root, label) => root.find(`ShowField[label="${label}"]`)

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

  it('renders hello', () => {
    expect(root.html()).toContain('<div>hello</div>')
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
      const props = findField(body, 'Surrendered By').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.children).toEqual('Hagrid')
    })

    it('renders Relationship to Surrendered Child', () => {
      const props = findField(body, 'Relationship to Surrendered Child').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.children).toEqual('Groundskeeper')
    })

    it('renders Bracelet ID', () => {
      const props = findField(body, 'Bracelet ID').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.children).toEqual('Lightning')
    })

    it('renders Comments', () => {
      const props = findField(body, 'Comments').props()
      expect(props.gridClassName).toEqual('col-md-12')
      expect(props.children).toEqual('Yer a wizard, Harry!')
    })

    it('renders Parent/Guardian Given Bracelet ID', () => {
      const props = findField(body, 'Parent/Guardian Given Bracelet ID').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.children).toEqual('Yes')
    })

    it('renders Parent/Guardian Provided Medical Questionaire', () => {
      const props = findField(body, 'Parent/Guardian Provided Medical Questionaire').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.children).toEqual('No')
    })

    it('renders Medical Questionaire Return Date', () => {
      const props = findField(body, 'Medical Questionaire Return Date').props()
      expect(props.gridClassName).toEqual('col-md-4')
      expect(props.children).toEqual('2001-11-14')
    })
  })
})
