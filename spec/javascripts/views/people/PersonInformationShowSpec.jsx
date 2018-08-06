import React from 'react'
import {shallow} from 'enzyme'
import PersonInformationShow from 'views/people/PersonInformationShow'

describe('PersonInformationShow', () => {
  const renderPersonShow = ({
    ssn = {},
    roles = {value: []},
    name = {},
    gender = {value: ''},
    ...options}) => {
    const params = {ssn, roles, name, gender, ...options}
    return shallow(<PersonInformationShow {...params} />, {disableLifecycleMethods: true})
  }

  it('renders the default avatar', () => {
    const view = renderPersonShow({})
    expect(view.find('img').props().src).toContain('default-profile.svg')
  })

  it('has alternative text', () => {
    const view = renderPersonShow({})
    expect(view.find('img').props().alt).toContain('Avatar')
  })

  it('renders the legacy source of the person', () => {
    const view = renderPersonShow({legacySource: '4, 8, 15, 16, 23'})
    expect(view.text()).toContain('4, 8, 15, 16, 23')
  })

  it('renders the display name of the person', () => {
    const name = {value: 'tester', errors: [], required: false}
    const view = renderPersonShow({name})
    expect(view.find('ShowField[label="Name"]').html()).toContain('tester')
  })

  it('renders the name required flag', () => {
    const name = {value: 'tester', errors: [], required: true}
    const view = renderPersonShow({name})
    expect(view.find('ShowField[label="Name"]').props().required).toEqual(true)
  })

  it('renders the first name error', () => {
    const name = {value: 'tester', errors: ['Please enter a first name.'], required: true}
    const view = renderPersonShow({name})
    expect(view.find('ShowField[label="Name"]').props().errors).toEqual(['Please enter a first name.'])
  })

  it('renders the gender of the person', () => {
    const view = renderPersonShow({gender: {value: 'decline to answer'}})
    expect(view.find('ShowField[label="Sex at Birth"]').html()).toContain('decline to answer')
  })

  it('renders gender errors when present', () => {
    const view = renderPersonShow({gender: {value: 'pizza', errors: ['Pizza is not a sex at birth']}})
    expect(view.find('ShowField[label="Sex at Birth"]').html()).toContain('Pizza is not a sex at birth')
  })

  it('renders the roles of the person', () => {
    const view = renderPersonShow({roles: {value: ['judge', 'jury', 'executioner']}})
    expect(view.find('ShowField[label="Role(s)"]').html()).toContain('judge', 'jury', 'executioner')
  })

  it('renders the roles error if roles include victim', () => {
    const view = renderPersonShow({roles: {value: ['Victim'], errors: ['Alleged victims must be under 18 years old.']}})
    const rolesField = view.find('ShowField[label="Role(s)"]')
    expect(rolesField.html()).toContain('Alleged victims must be under 18 years old.')
  })

  it('renders the language(s) of the person', () => {
    const view = renderPersonShow({languages: 'Klingon'})
    expect(view.find('ShowField[label="Language(s) (Primary First)"]').html()).toContain('Klingon')
  })

  it('renders the date of birth of the person when provided', () => {
    const view = renderPersonShow({dateOfBirth: 'Safar 17, 1440'})
    expect(view.find('ShowField[label="Date of birth"]').html()).toContain('Safar 17, 1440')
  })

  it('renders the approximate age of the person when date of birth is absent', () => {
    const view = renderPersonShow({approximateAge: '-1'})
    expect(view.find('ShowField[label="Date of birth"]').exists()).toBe(false)
    expect(view.find('ShowField[label="Approximate Age"]').html()).toContain('-1')
  })

  it('renders the Social security number of the person', () => {
    const view = renderPersonShow({ssn: {value: '???-??-????'}})
    const ssnField = view.find('ShowField[label="Social security number"]')
    expect(ssnField.html()).toContain('???-??-?')
  })

  it('renders errors for the the Social Security number', () => {
    const view = renderPersonShow({ssn: {errors: ['Something is wrong']}})
    const ssnField = view.find('ShowField[label="Social security number"]')
    expect(ssnField.html()).toContain('Something is wrong')
  })

  it('renders the Race of the person', () => {
    const view = renderPersonShow({races: 'Martian - Green Martian'})
    expect(view.find('ShowField[label="Race"]').html()).toContain('Martian - Green Martian')
  })

  it('renders the Hispanic/Latino Origin of the person', () => {
    const view = renderPersonShow({ethnicity: 'Maybe'})
    expect(view.find('ShowField[label="Hispanic/Latino Origin"]').html()).toContain('Maybe')
  })

  it('displays an errorMessage alert if one is passed', () => {
    const alertErrorMessage = 'Something went wrong!'
    const view = renderPersonShow({alertErrorMessage})
    expect(view.find('AlertErrorMessage').exists()).toEqual(true)
    expect(view.find('AlertErrorMessage').props().message).toEqual(alertErrorMessage)
  })

  it('does not display an errorMessage alert if one is not passed', () => {
    const view = renderPersonShow({alertErrorMessage: null})
    expect(view.find('AlertErrorMessage').exists()).toEqual(false)
  })

  it('renders the CSEC type field of the person when provided', () => {
    const view = renderPersonShow({CSECTypes: {value: ['At Risk']}, showCSEC: true})
    expect(view.find('ShowField[label="CSEC Types"]').html()).toContain('At Risk')
  })

  it('renders the CSEC type error if CSEC type is not selected', () => {
    const view = renderPersonShow({CSECTypes: {value: [], errors: ['CSEC type must be selected.']}, showCSEC: true})
    const csecTypesField = view.find('ShowField[label="CSEC Types"]')
    expect(csecTypesField.html()).toContain('CSEC type must be selected.')
  })

  it('renders the CSEC Start Date of the person when provided', () => {
    const view = renderPersonShow({csecStartedAt: {value: '22/22/2202'}, showCSEC: true})
    expect(view.find('ShowField[label="CSEC Start Date"]').html()).toContain('22/22/2202')
  })

  it('renders the CSEC started date error if CSEC started date is not selected', () => {
    const view = renderPersonShow({csecStartedAt: {value: '', errors: ['Start date must be entered.']}, showCSEC: true})
    const csecStartField = view.find('ShowField[label="CSEC Start Date"]')
    expect(csecStartField.html()).toContain('Start date must be entered.')
  })

  it('renders the CSEC End Date of the person when provided', () => {
    const view = renderPersonShow({csecEndedAt: '22/22/2202', showCSEC: true})
    expect(view.find('ShowField[label="CSEC End Date"]').html()).toContain('22/22/2202')
  })
})
