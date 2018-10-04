import React from 'react'
import {shallow} from 'enzyme'
import AgeDisplay from 'common/relationship/AgeDisplay'

describe('Age Display in RelationCard', () => {
  it('displays both dateOfBirth and age if the estimatedDobCode is set to N', () => {
    const row = {
      age: '20 yrs',
      dateOfBirth: '10/29/1992',
      estimatedDobCode: 'N',
    }
    const render = shallow(<AgeDisplay row={row} />)
    expect(render.html()).toEqual('<div>10/29/1992 (20 yrs)</div>')
  })

  it('displays only age if the estimatedDobCode is set to Y', () => {
    const row = {
      age: '20 yrs',
      dateOfBirth: '10/29/1992',
      estimatedDobCode: 'Y',
    }
    const render = shallow(<AgeDisplay row={row} />)
    expect(render.html()).toEqual('<div>(20 yrs)</div>')
  })

  it('returns null if the estimatedDobCode is set to U', () => {
    const row = {
      age: '20 yrs',
      dateOfBirth: '10/29/1992',
      estimatedDobCode: 'U',
    }
    const render = shallow(<AgeDisplay row={row} />)
    expect(render.html()).toEqual(null)
  })
})
