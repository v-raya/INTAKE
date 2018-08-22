export const setHash = (newHash) => {
  // Some browsers (Webkit) won't navigate to the same hash twice, so reset it
  window.location.hash = ''
  window.location.hash = newHash
}
