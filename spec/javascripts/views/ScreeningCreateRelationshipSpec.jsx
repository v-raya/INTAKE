import React from 'react'
import {shallow} from 'enzyme'
import ScreeningCreateRelationship from 'views/ScreeningCreateRelationship'

describe('ScreeningCreateRelationship', () => {
  const data = [{
    focus_person: 'Sally Fields 25yrs Male',
    related_person: 'Sam Fields 30yrs Male',
  }]
  const wrapper = shallow(<ScreeningCreateRelationship data={data}/>)

  it('has a button', () => {
    expect(wrapper.find('button').length).toBe(1)
  })
  it('has a ModalComponent', () => {
    expect(wrapper.find('ModalComponent').length).toBe(1)
  })

  it('simulate a click on button and show modal', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.instance().state.show).toBe(true)
  })

  it('closes the modal', () => {
    wrapper.setState({show: true})
    expect(wrapper.instance().state.show).toBe(true)
    wrapper.instance().closeModal()
    expect(wrapper.instance().state.show).toEqual(false)
  })

  it('closes the modal when the cancel button is clicked', () => {
    wrapper.setState({show: true})
    const footer = wrapper.find('ModalComponent').props().modalFooter
    const cancel = footer.props.children[0]
    expect(wrapper.state().show).toEqual(true)
    cancel.props.onClick()
    expect(wrapper.state().show).toEqual(false)
  })
})
