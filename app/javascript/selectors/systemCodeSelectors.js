import {Map, List} from 'immutable'

export const systemCodeDisplayValue = (code, systemCodes = List()) => systemCodes.find(
  (systemCode) => systemCode.get('code') === code, null, Map()
).get('value')

const getCodes = (type) => (state) => state.getIn(['systemCodes', type])

export const getAddressCountiesSelector = getCodes('addressCounties')
export const getAddressTypesSelector = getCodes('addressTypes')
export const getCountiesSelector = getCodes('counties')
export const getCountyAgenciesSelector = getCodes('countyAgencies')
export const getEthnicityTypesSelector = getCodes('ethnicityTypes')
export const getHispanicOriginCodesSelector = getCodes('hispanicOriginCodes')
export const getLanguagesSelector = getCodes('languages')
export const getRaceTypesSelector = getCodes('raceTypes')
export const getRelationshipTypesSelector = getCodes('relationshipTypes')
export const getScreenResponseTimesSelector = getCodes('screenResponseTimes')
export const getUnableToDetermineCodesSelector = getCodes('unableToDetermineCodes')
