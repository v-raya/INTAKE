import {saveCard} from 'actions/screeningActions'
import {touchAllFields} from 'actions/screeningInformationFormActions'
import {setCardMode, SHOW_MODE} from 'actions/screeningPageActions'
import {cardName, mergeProps} from 'containers/screenings/ScreeningInformationFormContainer'

describe('ScreeningInformationFormContainer', () => {
  describe('mergeProps', () => {
    it('combines all props from stateProps, dispatchProps, and ownProps', () => {
      const stateProps = {
        state: 'abc',
      }

      const dispatchProps = {
        action: 'def',
      }

      const ownProps = {
        prop: 'ghi',
      }

      expect(mergeProps(stateProps, dispatchProps, ownProps)).toEqual(jasmine.objectContaining({
        state: 'abc',
        action: 'def',
        prop: 'ghi',
      }))
    })

    describe('when saving', () => {
      it('saves the card, touches the fields, and sets show mode', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onSave = mergeProps({}, {dispatch}, {}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(dispatch).toHaveBeenCalledWith(setCardMode(cardName, SHOW_MODE))
        expect(dispatch).not.toHaveBeenCalledWith(jasmine.objectContaining({type: 'TRIGGER_SSB'}))
      })

      it('triggers SSB when report type changes to SSB', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onSave = mergeProps({prevReportType: '', reportType: 'ssb'}, {dispatch}, {}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(dispatch).toHaveBeenCalledWith(setCardMode(cardName, SHOW_MODE))
        expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({type: 'TRIGGER_SSB'}))
      })

      it('does not trigger SSB when report type was already SSB', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onSave = mergeProps({prevReportType: 'ssb', reportType: 'ssb'}, {dispatch}, {}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(dispatch).toHaveBeenCalledWith(setCardMode(cardName, SHOW_MODE))
        expect(dispatch).not.toHaveBeenCalledWith(jasmine.objectContaining({type: 'TRIGGER_SSB'}))
      })
    })
  })
})
