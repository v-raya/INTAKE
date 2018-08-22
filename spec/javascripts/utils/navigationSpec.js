import {setHash} from 'utils/navigation'
describe('Navigation', () => {
  describe('setHash', () => {
    it('sets the hash on the window location', () => {
      window.location.hash = '#foo'
      setHash('#bar')
      expect(window.location.hash).toEqual('#bar')
    })
  })
})
