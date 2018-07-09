import {logEvent} from 'utils/analytics'

describe('Analytics', () => {
  let newrelic
  beforeEach(() => {
    newrelic = jasmine.createSpyObj('newrelic', ['addPageAction'])
    window.newrelic = newrelic
  })

  describe('logEvent', () => {
    it('logs an event to newrelic', () => {
      logEvent('randomPageAction', {key1: 'value1'})

      expect(window.newrelic.addPageAction)
        .toHaveBeenCalledWith('randomPageAction', {key1: 'value1'})
    })
  })
})
