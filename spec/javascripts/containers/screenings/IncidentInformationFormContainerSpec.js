import {mapDispatchToProps} from 'containers/screenings/IncidentInformationFormContainer'
import * as Navigation from 'utils/navigation'

describe('IncidentInformationFormContainer', () => {
  describe('mapDispatchToProps', () => {
    let dispatch
    let onShow
    let props
    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
      onShow = jasmine.createSpy('onShow')
      spyOn(Navigation, 'setHash')

      props = mapDispatchToProps(dispatch, {onShow})
    })
    describe('when saving', () => {
      it('sets the card to show mode', () => {
        const {onSave} = props
        onSave()
        expect(onShow).toHaveBeenCalled()
      })
      it('navigates to the card', () => {
        const {onSave} = props
        onSave()
        expect(Navigation.setHash).toHaveBeenCalledWith('#incident-information-card-anchor')
      })
    })
    describe('when canceling', () => {
      it('sets the card to show mode', () => {
        const {onCancel} = props
        onCancel()
        expect(onShow).toHaveBeenCalled()
      })
      it('navigates to the card', () => {
        const {onCancel} = props
        onCancel()
        expect(Navigation.setHash).toHaveBeenCalledWith('#incident-information-card-anchor')
      })
    })
  })
})
