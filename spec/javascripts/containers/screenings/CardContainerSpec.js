import {setCardMode, EDIT_MODE, SHOW_MODE} from 'actions/screeningPageActions'
import {mapDispatchToProps} from 'containers/screenings/CardContainer'

describe('CardContainer', () => {
  describe('onEdit', () => {
    it('sets card mode to edit', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const {onEdit} = mapDispatchToProps(dispatch, {id: 'fluffy'})

      onEdit()
      expect(dispatch).toHaveBeenCalledWith(setCardMode('fluffy', EDIT_MODE))
    })
  })

  describe('onShow', () => {
    it('sets the card mode to show', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const {onShow} = mapDispatchToProps(dispatch, {id: 'fluffer'})

      onShow()
      expect(dispatch).toHaveBeenCalledWith(setCardMode('fluffer', SHOW_MODE))
    })
  })
})
