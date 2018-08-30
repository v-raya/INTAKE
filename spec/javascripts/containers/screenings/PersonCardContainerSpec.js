import {SHOW_MODE, SAVING_MODE, setPersonCardMode} from 'actions/screeningPageActions'
import {mapDispatchToProps} from 'containers/screenings/PersonCardContainer'
import * as Navigation from 'utils/navigation'

describe('PersonCardContainer', () => {
  describe('mapDispatchToProps', () => {
    const id = '34592'
    let dispatch
    let props
    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
      props = mapDispatchToProps(dispatch, {personId: id})

      spyOn(Navigation, 'setHash')
    })

    describe('when saving', () => {
      it('navigates to the card', () => {
        props.onSave()
        expect(Navigation.setHash).toHaveBeenCalledWith(`#participants-card-${id}`)
      })

      it('sets the card to saving mode', () => {
        props.onSave()
        expect(dispatch).toHaveBeenCalledWith(setPersonCardMode(id, SAVING_MODE))
      })
    })
    describe('when canceling', () => {
      it('navigates to the card', () => {
        props.onCancel()
        expect(Navigation.setHash).toHaveBeenCalledWith(`#participants-card-${id}`)
      })

      it('sets the card to show mode', () => {
        props.onCancel()
        expect(dispatch).toHaveBeenCalledWith(setPersonCardMode(id, SHOW_MODE))
      })
    })
  })
})
