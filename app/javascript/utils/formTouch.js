import {Map, fromJS} from 'immutable'

export const untouched = (value) => ({
  value,
  touched: false,
})

export const toUntouchedObject = (fields, screening) =>
  fields.reduce(
    (map, field) => map.set(field, fromJS(untouched(screening[field]))),
    Map()
  )
