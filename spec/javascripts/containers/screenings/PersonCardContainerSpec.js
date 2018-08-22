import {mapDispatchToProps} from 'containers/screenings/PersonCardContainer'
import * as Navigation from 'utils/navigation'

describe('PersonCardContainer', () => {
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      spyOn(Navigation, 'setHash')
    })
    describe('when saving', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch, {personId: '34592'})
        onSave()
        expect(Navigation.setHash).toHaveBeenCalledWith('#participants-card-34592')
      })
    })
    describe('when canceling', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onCancel} = mapDispatchToProps(dispatch, {personId: '34592'})
        onCancel()
        expect(Navigation.setHash).toHaveBeenCalledWith('#participants-card-34592')
      })
    })
  })
})
