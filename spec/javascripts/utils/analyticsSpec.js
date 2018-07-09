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
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(true)

      logEvent('randomPageAction', {key1: 'value1'})

      expect(window.newrelic.addPageAction)
        .toHaveBeenCalledWith('randomPageAction', {key1: 'value1'})
    })

    it('noops when newrelic analytics are disabled', () => {
      spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)

      logEvent('randomPageAction', {key1: 'value1'})

      expect(window.newrelic.addPageAction)
        .not.toHaveBeenCalled()
    })
  })
})
