import {mapDispatchToProps} from 'containers/screenings/IncidentInformationFormContainer'
import * as Navigation from 'utils/navigation'

describe('IncidentInformationFormContainer', () => {
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      spyOn(Navigation, 'setHash')
    })
    describe('when saving', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch)
        onSave()
        expect(Navigation.setHash).toHaveBeenCalledWith('#incident-information-card-anchor')
      })
    })
    describe('when canceling', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onCancel} = mapDispatchToProps(dispatch)
        onCancel()
        expect(Navigation.setHash).toHaveBeenCalledWith('#incident-information-card-anchor')
      })
    })
  })
})
