import {mapDispatchToProps} from 'containers/screenings/WorkerSafetyFormContainer'

describe('WorkerSafetyFormContainer', () => {
  describe('mapDispatchToProps', () => {
    describe('when saving', () => {
      beforeEach(() => {
        window.location.hash = ''
      })
      afterEach(() => {
        window.location.hash = ''
      })
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch)
        onSave()
        expect(window.location.hash).toEqual('#worker-safety-card-anchor')
      })
    })
  })
})
