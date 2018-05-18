import React from 'react'
import {shallow} from 'enzyme'
import SafelySurrenderedBabyShow from 'views/people/SafelySurrenderedBabyShow'

describe('SafelySurrenderedBabyShow', () => {
  const render = () => shallow(<SafelySurrenderedBabyShow />)
  const findField = (root, label) => root.find(`ShowField[label="${label}"]`)

  let root

  beforeEach(() => {
    root = render()
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
      expect(body.exists()).toEqual(true)
      expect(body.props().className).toContain('row')
    })

    it('renders Surrendered By', () => {
      const field = findField(body, 'Surrendered By')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-4')
    })

    it('renders Relationship to Surrendered Child', () => {
      const field = findField(body, 'Relationship to Surrendered Child')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-4')
    })

    it('renders Bracelet ID', () => {
      const field = findField(body, 'Bracelet ID')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-4')
    })

    it('renders Comments', () => {
      const field = findField(body, 'Comments')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-12')
    })

    it('renders Parent/Guardian Given Bracelet ID', () => {
      const field = findField(body, 'Parent/Guardian Given Bracelet ID')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-4')
    })

    it('renders Parent/Guardian Provided Medical Questionaire', () => {
      const field = findField(body, 'Parent/Guardian Provided Medical Questionaire')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-4')
    })

    it('renders Medical Questionaire Return Date', () => {
      const field = findField(body, 'Medical Questionaire Return Date')
      expect(field.exists()).toBe(true)
      expect(field.props().gridClassName).toEqual('col-md-4')
    })
  })
})
