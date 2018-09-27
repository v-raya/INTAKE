export const mapDispatchToPropsFactory = ({
  cardName,
  setField,
  touchAllFields,
  touchField,
  saveCard,
  clearCardEdits,
}) => (dispatch, {onSave, onShow}) => ({
  onBlur: (fieldName) => dispatch(touchField(fieldName)),
  onCancel: () => {
    dispatch(clearCardEdits(cardName))
    dispatch(touchAllFields())
    onShow()
  },
  onChange: (fieldName, value) => dispatch(setField(fieldName, value)),
  onSave: () => {
    dispatch(saveCard(cardName))
    dispatch(touchAllFields())
    onSave()
  },
})
