import {mapDispatchToProps} from 'containers/screenings/WorkerSafetyFormContainer'
import * as Navigation from 'utils/navigation'

describe('WorkerSafetyFormContainer', () => {
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      spyOn(Navigation, 'setHash')
    })
    describe('when saving', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch)
        onSave()
        expect(Navigation.setHash).toHaveBeenCalledWith('#worker-safety-card-anchor')
      })
    })
    describe('when canceling', () => {
      beforeEach(() => {
        window.location.hash = ''
      })
      afterEach(() => {
        window.location.hash = ''
      })
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onCancel} = mapDispatchToProps(dispatch)
        onCancel()
        expect(Navigation.setHash).toHaveBeenCalledWith('#worker-safety-card-anchor')
      })
    })
  })
})
