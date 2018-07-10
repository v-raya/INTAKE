import * as IntakeConfig from 'common/config'
import {logEvent} from 'utils/analytics'

describe('Analytics', () => {
  let newrelic
  beforeEach(() => {
    newrelic = jasmine.createSpyObj('newrelic', ['addPageAction'])
    window.newrelic = newrelic
  })

  describe('logEvent', () => {
    it('logs an event to newrelic', () => {
      spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(false)

      logEvent('someAction', {key1: 'value1'})

      expect(window.newrelic.addPageAction)
        .toHaveBeenCalledWith('someAction', {key1: 'value1'})
    })

    it('noops when newrelic analytics are disabled', () => {
      spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(true)

      logEvent('someAction', {key1: 'value1'})

      expect(window.newrelic.addPageAction).not.toHaveBeenCalled()
    })

    it('does not crash when newrelic is undefined', () => {
      spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(false)
      window.newrelic = undefined

      expect(() =>
        logEvent('someAction', {key1: 'value1'})
      ).not.toThrow()
    })

    it('noops when there is no event name', () => {
      spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(false)
      logEvent(null, {key1: 'value1'})
      logEvent(undefined, {key1: 'value1'})
      expect(window.newrelic.addPageAction).not.toHaveBeenCalled()
    })

    it('logs an event with no custom attributes', () => {
      spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(false)
      logEvent('someAction')
      expect(window.newrelic.addPageAction).toHaveBeenCalledWith('someAction')
    })
  })
})
