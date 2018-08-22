import {mapDispatchToProps} from 'containers/screenings/NarrativeFormContainer'
import * as Navigation from 'utils/navigation'

describe('NarrativeFormContainer', () => {
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      spyOn(Navigation, 'setHash')
    })
    describe('when saving', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch)
        onSave()
        expect(Navigation.setHash).toHaveBeenCalledWith('#narrative-card-anchor')
      })
    })
    describe('when canceling', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onCancel} = mapDispatchToProps(dispatch)
        onCancel()
        expect(Navigation.setHash).toHaveBeenCalledWith('#narrative-card-anchor')
      })
    })
  })
})
