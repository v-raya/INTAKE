import {fromJS, List, Map} from 'immutable'
import PHONE_NUMBER_TYPE from 'enums/PhoneNumberType'
import {getPhoneNumberErrors} from 'utils/phoneNumberValidator'

export const getPhoneNumberTypeOptions = () => fromJS(PHONE_NUMBER_TYPE.map((type) => ({value: type, label: type})))
export const getPersonPhoneNumbersSelector = (state, personId) => (
  state.get('peopleForm', Map()).get(personId).get('phone_numbers', List()).map((phoneNumber) => (
    Map({
      number: phoneNumber.getIn(['number', 'value']) || '',
      type: phoneNumber.getIn(['type', 'value']) || '',
      errors: getPhoneNumberErrors(phoneNumber.getIn(['number', 'value'])),
    })
  ))
)
