import {mapDispatchToProps} from 'containers/screenings/PersonCardContainer'

describe('PersonCardContainer', () => {
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      window.location.hash = ''
    })
    afterEach(() => {
      window.location.hash = ''
    })
    describe('when saving', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onSave} = mapDispatchToProps(dispatch, {personId: '34592'})
        onSave()
        expect(window.location.hash).toEqual('#participants-card-34592')
      })
    })
    describe('when canceling', () => {
      it('navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const {onCancel} = mapDispatchToProps(dispatch, {personId: '34592'})
        onCancel()
        expect(window.location.hash).toEqual('#participants-card-34592')
      })
    })
  })
})
