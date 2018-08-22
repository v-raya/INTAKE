import {generateBabyDoe} from 'actions/safelySurrenderedBabyActions'
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
      beforeEach(() => {
        window.location.hash = ''
      })
      it('saves the card, touches the fields, sets show mode, and navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onSave = mergeProps({screeningId: '3'}, {dispatch}, {}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).not.toHaveBeenCalledWith(generateBabyDoe('3'))

        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(dispatch).toHaveBeenCalledWith(setCardMode(cardName, SHOW_MODE))

        expect(window.location.hash).toEqual('#screening-information-card-anchor')
      })

      it('triggers SSB when report type changes to SSB', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onSave = mergeProps({persistedReportType: '', screeningId: '3', reportType: 'ssb'}, {dispatch}, {}).onSave

        onSave()

        expect(dispatch).not.toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).toHaveBeenCalledWith(generateBabyDoe('3'))

        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(dispatch).toHaveBeenCalledWith(setCardMode(cardName, SHOW_MODE))
        expect(window.location.hash).toEqual('#screening-information-card-anchor')
      })

      it('does not trigger SSB when report type was already SSB', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onSave = mergeProps({persistedReportType: 'ssb', screeningId: '3', reportType: 'ssb'}, {dispatch}, {}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).not.toHaveBeenCalledWith(generateBabyDoe('3'))

        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(dispatch).toHaveBeenCalledWith(setCardMode(cardName, SHOW_MODE))
      })
    })
  })
})
