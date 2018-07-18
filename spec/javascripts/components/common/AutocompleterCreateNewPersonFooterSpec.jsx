import AutocompleterCreateNewPersonFooter from 'common/AutocompleterCreateNewPersonFooter'
import React from 'react'
import {shallow} from 'enzyme'

describe('<AutocompleterCreateNewPersonFooter />', () => {
  function renderAutocompleterCreateNewPersonFooter({
    canCreateNewPerson,
    onCreateNewPerson = () => null,
  }) {
    return shallow(
      <AutocompleterCreateNewPersonFooter
        canCreateNewPerson={canCreateNewPerson}
        onCreateNewPerson={onCreateNewPerson}
      />, {disableLifecycleMethods: true}
    )
  }

  it('does not render CreateUnknownPerson when cannnot create new person', () => {
    const component = renderAutocompleterCreateNewPersonFooter({canCreateNewPerson: false})
      .find('CreateUnknownPerson')
    expect(component.exists()).toEqual(false)
  })

  it('renders CreateUnknownPerson when can create new person', () => {
    const onCreateNewPerson = jasmine.createSpy('onCreateNewPerson')
    const component = renderAutocompleterCreateNewPersonFooter({
      canCreateNewPerson: true,
      onCreateNewPerson,
    }).find('CreateUnknownPerson')
    expect(component.exists()).toEqual(true)
    expect(component.props().onClick).toEqual(onCreateNewPerson)
  })
})
