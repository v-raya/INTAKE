import AutocompleterFooter from 'common/AutocompleterFooter'
import React from 'react'
import {shallow} from 'enzyme'

describe('<AutocompleterFooter />', () => {
  function renderAutocompleterFooter({
    canLoadMoreResults,
    onLoadMoreResults = () => null,
  }) {
    return shallow(
      <AutocompleterFooter
        canLoadMoreResults={canLoadMoreResults}
        onLoadMoreResults={onLoadMoreResults}
      />, {disableLifecycleMethods: true}
    )
  }

  it('does not render ShowMoreResults when cannot load more results', () => {
    const component = renderAutocompleterFooter({canLoadMoreResults: false})
      .find('ShowMoreResults')
    expect(component.exists()).toEqual(false)
  })

  it('renders ShowMoreResults when can load more results', () => {
    const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
    const component = renderAutocompleterFooter({
      canLoadMoreResults: true,
      onLoadMoreResults,
    }).find('ShowMoreResults')
    expect(component.exists()).toEqual(true)
    expect(component.props().onClick).toEqual(onLoadMoreResults)
  })
})
