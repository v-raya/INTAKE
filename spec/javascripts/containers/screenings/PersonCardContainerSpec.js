import {mapDispatchToProps} from 'containers/screenings/PersonCardContainer'

describe('PersonCardContainer', () => {
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
        const {onSave} = mapDispatchToProps(dispatch, {personId: '34592'})
        onSave()
        expect(window.location.hash).toEqual('#participants-card-34592')
      })
    })
  })
})
