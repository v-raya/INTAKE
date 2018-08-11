import {fromJS} from 'immutable'

export const addressFromFerb = ({
  id,
  street_address,
  city,
  state,
  zip,
  type,
  legacy_id,
  legacy_descriptor,
}) => fromJS({
  id,
  street: {touched: false, value: street_address},
  city: {touched: false, value: city},
  state: {touched: false, value: state},
  zip: {touched: false, value: zip},
  type: {touched: false, value: type},
  legacy_id: {touched: false, value: legacy_id},
  legacy_descriptor: {touched: false, value: legacy_descriptor},
})

export const isReadWrite = (address) => !address.getIn(['legacy_id', 'value'])
export const isReadOnly = (address) => Boolean(address.getIn(['legacy_id', 'value']))
