import {mapDispatchToPropsFactory} from 'utils/connectors'

describe('mapDispatchToPropsFactory', () => {
  let props

  let setField
  let touchAllFields
  let touchField
  let saveCard
  let clearCardEdits
  let dispatch
  let onSave
  let onShow

  beforeEach(() => {
    setField = jasmine.createSpy('setField').and.returnValue('setField')
    touchAllFields = jasmine.createSpy('touchAllFields').and.returnValue('touchAllFields')
    touchField = jasmine.createSpy('touchField').and.returnValue('touchField')
    saveCard = jasmine.createSpy('saveCard').and.returnValue('saveCard')
    clearCardEdits = jasmine.createSpy('clearCardEdits').and.returnValue('clearCardEdits')
    dispatch = jasmine.createSpy('dispatch')
    onSave = jasmine.createSpy('onSave')
    onShow = jasmine.createSpy('onShow')

    props = mapDispatchToPropsFactory({
      cardName: 'my-card',
      setField,
      touchAllFields,
      touchField,
      saveCard,
      clearCardEdits,
    })(dispatch, {onSave, onShow})
  })

  it('dispatches touchField with the passed fieldName on blur', () => {
    props.onBlur('my-field')
    expect(touchField).toHaveBeenCalledWith('my-field')
    expect(dispatch).toHaveBeenCalledWith('touchField')
  })

  it('clears edits, touches fields, and calls onShow on cancel', () => {
    props.onCancel()
    expect(clearCardEdits).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith('clearCardEdits')
    expect(touchAllFields).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith('touchAllFields')
    expect(onShow).toHaveBeenCalled()
  })

  it('dispatches setField with the passed fieldName on change', () => {
    props.onChange('my-field', 'my-value')
    expect(setField).toHaveBeenCalledWith('my-field', 'my-value')
    expect(dispatch).toHaveBeenCalledWith('setField')
  })

  it('saves card, touches fields, and calls onSave on save', () => {
    props.onSave()
    expect(saveCard).toHaveBeenCalledWith('my-card')
    expect(dispatch).toHaveBeenCalledWith('saveCard')
    expect(touchAllFields).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith('touchAllFields')
    expect(onSave).toHaveBeenCalled()
  })
})
