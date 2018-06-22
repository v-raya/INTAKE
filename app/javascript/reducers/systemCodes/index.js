import {combineReducers} from 'redux-immutable'
import addressTypes from 'reducers/systemCodes/addressTypesReducer'
import allegationTypes from 'reducers/systemCodes/allegationTypesReducer'
import communicationMethods from 'reducers/systemCodes/communicationMethodsReducer'
import counties from 'reducers/systemCodes/countiesReducer'
import addressCounties from 'reducers/systemCodes/addressCountiesReducer'
import countyAgencies from 'reducers/systemCodes/countyAgenciesReducer'
import languages from 'reducers/systemCodes/languagesReducer'
import locations from 'reducers/systemCodes/locationsReducer'
import unableToDetermineCodes from 'reducers/systemCodes/unableToDetermineCodesReducer'
import hispanicOriginCodes from 'reducers/systemCodes/hispanicOriginCodesReducer'
import ethnicityTypes from 'reducers/systemCodes/ethnicityTypesReducer'
import raceTypes from 'reducers/systemCodes/raceTypesReducer'
import relationshipTypes from 'reducers/systemCodes/relationshipTypesReducer'
import safetyAlerts from 'reducers/systemCodes/safetyAlertsReducer'
import screenResponseTimes from 'reducers/systemCodes/screenResponseTimesReducer'
import usStates from 'reducers/systemCodes/usStatesReducer'

const systemCodesReducer = combineReducers({
  addressCounties,
  addressTypes,
  allegationTypes,
  communicationMethods,
  counties,
  countyAgencies,
  ethnicityTypes,
  hispanicOriginCodes,
  languages,
  locations,
  raceTypes,
  relationshipTypes,
  safetyAlerts,
  screenResponseTimes,
  unableToDetermineCodes,
  usStates,
})

export default systemCodesReducer
