import {isFeatureInactive} from 'common/config'

export const logEvent = (event, attributes) => {
  if (
    isFeatureInactive('enable_newrelic_analytics') ||
    !window.newrelic ||
    !event
  ) { return }

  if (attributes) {
    window.newrelic.addPageAction(event, attributes)
  } else {
    window.newrelic.addPageAction(event)
  }
}
