import {mapDispatchToProps} from 'containers/screenings/IncidentInformationFormContainer'

describe('IncidentInformationFormContainer', () => {
  describe('mapDispatchToProps', () => {
    let dispatch
    let onShow
    let props
    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
      onShow = jasmine.createSpy('onShow')
      props = mapDispatchToProps(dispatch, {onShow})
    })
    describe('when saving', () => {
      it('sets the card to show mode', () => {
        const {onSave} = props
        onSave()
        expect(onShow).toHaveBeenCalled()
      })
    })
    describe('when canceling', () => {
      it('sets the card to show mode', () => {
        const {onCancel} = props
        onCancel()
        expect(onShow).toHaveBeenCalled()
      })
    })
  })
})
