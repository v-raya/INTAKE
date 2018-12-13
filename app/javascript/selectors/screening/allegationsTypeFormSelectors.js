import {createSelector} from 'reselect'
import {List} from 'immutable'
const getAllegationsFormSelector = (state) => state.get('allegationsForm', List())

export const getAllegationsWithTypesSelector = createSelector(
  getAllegationsFormSelector,
  (allegations) => allegations.filterNot((allegation) => (
    allegation.get('allegationTypes').filterNot((type) => type === '').isEmpty()
  ))
)
