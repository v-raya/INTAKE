import {setCardMode, EDIT_MODE, SHOW_MODE} from 'actions/screeningPageActions'
import {mapDispatchToProps} from 'containers/screenings/CardContainer'
import * as Navigation from 'utils/navigation'

describe('CardContainer', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jasmine.createSpy('dispatch')
    spyOn(Navigation, 'setHash')
  })
  describe('onEdit', () => {
    it('sets card mode to edit', () => {
      const {onEdit} = mapDispatchToProps(dispatch, {id: 'fluffy'})

      onEdit()
      expect(dispatch).toHaveBeenCalledWith(setCardMode('fluffy', EDIT_MODE))
    })
  })

  describe('onShow', () => {
    it('sets the card mode to show', () => {
      const {onShow} = mapDispatchToProps(dispatch, {id: 'fluffer'})

      onShow()
      expect(dispatch).toHaveBeenCalledWith(setCardMode('fluffer', SHOW_MODE))
    })

    it('navigates to the anchor for the card', () => {
      const {onShow} = mapDispatchToProps(dispatch, {id: 'hello'})

      onShow()
      expect(Navigation.setHash).toHaveBeenCalledWith('#hello-anchor')
    })
  })
})
