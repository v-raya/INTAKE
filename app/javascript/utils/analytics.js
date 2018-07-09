// console.log(newrelic)
//
// newrelic.addPageAction('randomEventNameHere', {key1: 'value1'})
export const logEvent = (event, attributes) =>
  window.newrelic.addPageAction(event, attributes)
