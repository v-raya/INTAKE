import {generateBabyDoe} from 'actions/safelySurrenderedBabyActions'
import {saveCard} from 'actions/screeningActions'
import {touchAllFields} from 'actions/screeningInformationFormActions'
import {
  cardName,
  mapDispatchToProps,
  mergeProps,
} from 'containers/screenings/ScreeningInformationFormContainer'
import * as Navigation from 'utils/navigation'

describe('ScreeningInformationFormContainer', () => {
  describe('mapDispatchToProps', () => {
    describe('when canceling', () => {
      beforeEach(() => {
        spyOn(Navigation, 'setHash')
      })
      it('sets card to show mode and navigates to the card', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onShow = jasmine.createSpy('onShow')
        const {onCancel} = mapDispatchToProps(dispatch, {onShow})

        onCancel()

        expect(onShow).toHaveBeenCalled()
        expect(Navigation.setHash).toHaveBeenCalledWith('#screening-information-card-anchor')
      })
    })
  })
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
        spyOn(Navigation, 'setHash')
      })
      it('saves the card, touches the fields, and sets card to show mode', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onShow = jasmine.createSpy('onShow')
        const onSave = mergeProps({screeningId: '3'}, {dispatch}, {onShow}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).not.toHaveBeenCalledWith(generateBabyDoe('3'))

        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(onShow).toHaveBeenCalled()

        expect(Navigation.setHash).toHaveBeenCalledWith('#screening-information-card-anchor')
      })

      it('triggers SSB when report type changes to SSB', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onShow = jasmine.createSpy('onShow')
        const onSave = mergeProps({persistedReportType: '', screeningId: '3', reportType: 'ssb'}, {dispatch}, {onShow}).onSave

        onSave()

        expect(dispatch).not.toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).toHaveBeenCalledWith(generateBabyDoe('3'))

        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(onShow).toHaveBeenCalled()
        expect(Navigation.setHash).toHaveBeenCalledWith('#screening-information-card-anchor')
      })

      it('does not trigger SSB when report type was already SSB', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const onShow = jasmine.createSpy('onShow')
        const onSave = mergeProps({persistedReportType: 'ssb', screeningId: '3', reportType: 'ssb'}, {dispatch}, {onShow}).onSave

        onSave()

        expect(dispatch).toHaveBeenCalledWith(saveCard(cardName))
        expect(dispatch).not.toHaveBeenCalledWith(generateBabyDoe('3'))

        expect(dispatch).toHaveBeenCalledWith(touchAllFields())
        expect(onShow).toHaveBeenCalled()
      })
    })
  })
})
