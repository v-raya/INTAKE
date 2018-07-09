import {isFeatureActive} from 'common/config'

export const logEvent = (event, attributes) =>
  isFeatureActive('enable_newrelic_analytics') &&
    window.newrelic.addPageAction(event, attributes)
