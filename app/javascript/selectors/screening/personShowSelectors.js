import {List, Map, fromJS} from 'immutable'
import {isReadWrite, isReadOnly} from 'data/address'
import {flagPrimaryLanguage} from 'common/LanguageInfo'
import GENDERS from 'enums/Genders'
import {selectParticipant, selectFormattedAddresses} from 'selectors/participantSelectors'
import legacySourceFormatter from 'utils/legacySourceFormatter'
import nameFormatter from 'utils/nameFormatter'
import ssnFormatter from 'utils/ssnFormatter'
import {dateFormatter} from 'utils/dateFormatter'
import {
  isRequiredIfCreate,
  combineCompact,
  hasRequiredValuesIfCreate,
  isFutureDatetimeCreate,
  isBeforeDatetimeCreate,
} from 'utils/validator'
import {phoneNumberFormatter} from 'utils/phoneNumberFormatter'
import {hasNonReporter} from 'utils/roles'
import {getSSNErrors} from 'utils/ssnValidator'
import {getZIPErrors} from 'utils/zipValidator'
import moment from 'moment'
import {systemCodeDisplayValue, selectCsecTypes} from 'selectors/systemCodeSelectors'
import {selectCsec} from 'selectors/screening/personCardSelectors'

const selectPersonOrEmpty = (state, personId) =>
  selectParticipant(state, personId).valueOrElse(Map())

export const getNamesRequiredSelector = (state, personId) => {
  const person = selectPersonOrEmpty(state, personId)
  const roles = person.get('roles', List())
  return (roles.includes('Victim'))
}

const selectAlertMessageByRole = (roles) => {
  if (roles.includes('Victim')) {
    return 'Alleged victims must be identified with a name, even Doe or Unknown, and must be under the age of 18'
  }
  return undefined
}

export const getPersonAlertErrorMessageSelector = (state, personId) => {
  const required = getNamesRequiredSelector(state, personId)
  const person = selectPersonOrEmpty(state, personId)
  const lastName = person.get('last_name')
  const firstName = person.get('first_name')
  const roles = person.get('roles', List())
  if (required && !(firstName && lastName)) {
    return selectAlertMessageByRole(roles)
  }
  return undefined
}

const calculateAgeFromScreeningDate = (state, personId) => {
  const screeningStartDate = moment(state.getIn(['screeningInformationForm', 'started_at', 'value']))
  const person = selectPersonOrEmpty(state, personId)
  const dateOfBirth = person.get('date_of_birth') || ''
  const approximateAge = parseInt(person.get('approximate_age'), 10)
  const approximateAgeUnit = person.get('approximate_age_units')

  let ageFromScreeningDate

  if (dateOfBirth) {
    ageFromScreeningDate = screeningStartDate.diff(moment(dateOfBirth, 'MM/DD/YYYY'), 'years')
  } else if (approximateAge && approximateAgeUnit) {
    ageFromScreeningDate = moment().diff(screeningStartDate, 'years') + moment.duration(approximateAge, approximateAgeUnit).asYears()
  }

  return ageFromScreeningDate
}

const ageFromScreeningDateIsEmpty = (state, personId) => {
  const ageFromScreeningDate = calculateAgeFromScreeningDate(state, personId)

  return typeof ageFromScreeningDate !== 'number'
}
const isOver18YearsOfAgeAtScreeningDate = (state, personId) => {
  const ageFromScreeningDate = calculateAgeFromScreeningDate(state, personId)
  const ageLimit = 18
  return ageFromScreeningDate && ageFromScreeningDate >= ageLimit
}

const selectNameErrors = (firstName, lastName, roles) => combineCompact(
  isRequiredIfCreate(firstName, 'Please enter a first name.', () => hasNonReporter(roles)),
  isRequiredIfCreate(lastName, 'Please enter a last name.', () => hasNonReporter(roles))
)

const selectRoleErrors = (state, personId, roles) => combineCompact(
  () => {
    if (roles.includes('Victim') && (ageFromScreeningDateIsEmpty(state, personId) || isOver18YearsOfAgeAtScreeningDate(state, personId))) {
      return 'Alleged victims must be under 18 years old.'
    } else {
      return undefined
    }
  }
)

const selectCSECTypeErrors = (state, csecTypes, roles, screeningReportType) => combineCompact(
  hasRequiredValuesIfCreate(csecTypes, 'CSEC type must be selected.',
    () => (roles && screeningReportType && roles.includes('Victim') && screeningReportType === 'csec'))
)
const showCSEC = (state, personId) => {
  const roles = state.getIn(['peopleForm', personId, 'roles', 'value']) || List()
  const screeningReportType = state.getIn(['screeningInformationForm', 'report_type', 'value'])
  const csecDetails = selectCsec(state).get(personId) || List()
  if ((roles.includes('Victim') && screeningReportType === 'csec') || csecDetails.size > 0) {
    return true
  }
  return false
}

const selectCSECStartedAtErrors = (state, personId, csecStartedAt, csecEndedAt) => {
  const csec = showCSEC(state, personId)
  return combineCompact(
    isRequiredIfCreate(csecStartedAt, 'Start date must be entered.',
      () => (csec)),
    isFutureDatetimeCreate(csecStartedAt, 'The start date and time cannot be in the future.',
      () => (csec)),
    isBeforeDatetimeCreate(
      csecEndedAt,
      csecStartedAt, 'The start date and time must be before the end date and time.',
      () => (csec))
  )
}

const selectCSECEndedAtErrors = (state, personId, csecEndedAt) => combineCompact(
  isFutureDatetimeCreate(csecEndedAt, 'The end date and time cannot be in the future.',
    () => (showCSEC(state, personId)))
)

const selectGenderErrors = (person, roles) => combineCompact(
  isRequiredIfCreate(person.get('gender'), 'Please select a Sex at Birth.',
    () => hasNonReporter(roles))
)

const csecTypesSelector = (state, personId) => {
  const person = selectPersonOrEmpty(state, personId)
  const csecTypes = selectCsecTypes(state)
  return person.get('csec', List()).map((csec) =>
    systemCodeDisplayValue(csec.get('csec_code_id'), csecTypes)
  )
}

const selectDobError = (person) => combineCompact(
  isFutureDatetimeCreate(person.get('date_of_birth'), 'Date of Birth should not be in the future.'
  )
)

export const getErrorsSelector = (state, personId) => {
  const person = selectPersonOrEmpty(state, personId)
  const ssn = person.get('ssn') || ''
  const ssnWithoutHyphens = ssn.replace(/-|_/g, '')
  const lastName = person.get('last_name')
  const firstName = person.get('first_name')
  const addressZip = (person.get('addresses') || List()).filter(isReadWrite)
    .map((address) => getZIPErrors(address.get('zip'))).flatten()
  const roles = person.get('roles', List())
  const csecTypes = csecTypesSelector(state, personId)
  const csecStartedAt = person.getIn(['csec', 0, 'start_date'])
  const csecEndedAt = person.getIn(['csec', 0, 'end_date'])
  const screeningReportType = state.getIn(['screeningInformationForm', 'report_type', 'value'])
  const rolesTypes = state.getIn(['peopleForm', personId, 'roles', 'value'], List()).toJS()
  return fromJS({
    name: selectNameErrors(firstName, lastName, roles),
    roles: selectRoleErrors(state, personId, roles),
    ssn: getSSNErrors(ssnWithoutHyphens),
    gender: selectGenderErrors(person, roles),
    dateOfBirth: selectDobError(person),
    addressZip,
    csecTypes: selectCSECTypeErrors(state, csecTypes, rolesTypes, screeningReportType),
    csecStartedAt: selectCSECStartedAtErrors(state, personId, csecStartedAt, csecEndedAt),
    csecEndedAt: selectCSECEndedAtErrors(state, personId, csecEndedAt),
  })
}

const selectRaces = (person) => (
  person.get('races') && person.get('races').map((raceInformation, index) => {
    const race = raceInformation.get('race')
    const raceDetail = raceInformation.get('race_detail')
    const racePrimary = index === 0 ? ' (primary)' : ''
    const raceDetailText = raceDetail ? ` - ${raceDetail}` : ''
    return `${race}${raceDetailText}${racePrimary}`
  }).join(', ')
)

const selectEthnicity = (person) => {
  const {hispanic_latino_origin: hispanicLatinoOrigin, ethnicity_detail} = person.toJS().ethnicity || {}

  if (!hispanicLatinoOrigin) { return undefined }

  const ethnicityText = ethnicity_detail.length > 0 ? `${ethnicity_detail} - ` : ''
  return `${ethnicityText}${hispanicLatinoOrigin}`
}

const personApproximateAge = (person) => {
  const showApproximateAge = !person.get('date_of_birth') && person.get('approximate_age')
  if (showApproximateAge) {
    return [person.get('approximate_age'), person.get('approximate_age_units')].join(' ')
  } else {
    return undefined
  }
}

export const getFormattedPersonInformationSelector = (state, personId) => {
  const person = selectPersonOrEmpty(state, personId)
  const legacyDescriptor = person.get('legacy_descriptor')
  const approximateAge = personApproximateAge(person)
  return fromJS({
    approximateAge: approximateAge,
    CSECTypes: {value: csecTypesSelector(state, personId), errors: []},
    csecStartedAt: {value: (person.getIn(['csec', 0, 'start_date']) && dateFormatter(person.getIn(['csec', 0, 'start_date']))), errors: []},
    csecEndedAt: {value: (person.getIn(['csec', 0, 'end_date']) && dateFormatter(person.getIn(['csec', 0, 'end_date']))), errors: []},
    dateOfBirth: {value: person.get('date_of_birth') && dateFormatter(person.get('date_of_birth'))},
    ethnicity: selectEthnicity(person),
    gender: {value: GENDERS[person.get('gender')]},
    languages: person.get('languages') && flagPrimaryLanguage((person.toJS().languages) || []).join(', '),
    legacySource: legacyDescriptor && legacySourceFormatter(legacyDescriptor.toJS()),
    name: {value: nameFormatter(person.toJS()), errors: [], required: false},
    races: selectRaces(person),
    roles: {value: person.get('roles', List()), errors: []},
    ssn: {value: ssnFormatter(person.get('ssn')), errors: []},
    alertErrorMessage: getPersonAlertErrorMessageSelector(state, personId),
    showCSEC: showCSEC(state, personId),
  })
}

export const getFormattedPersonWithErrorsSelector = (state, personId) => {
  const errors = getErrorsSelector(state, personId)
  return getFormattedPersonInformationSelector(state, personId)
    .setIn(['ssn', 'errors'], errors.get('ssn'))
    .setIn(['name', 'errors'], errors.get('name'))
    .setIn(['name', 'required'], getNamesRequiredSelector(state, personId))
    .setIn(['roles', 'errors'], errors.get('roles'))
    .setIn(['gender', 'errors'], errors.get('gender'))
    .setIn(['CSECTypes', 'errors'], errors.get('csecTypes'))
    .setIn(['csecStartedAt', 'errors'], errors.get('csecStartedAt'))
    .setIn(['csecEndedAt', 'errors'], errors.get('csecEndedAt'))
    .setIn(['dateOfBirth', 'errors'], errors.get('dateOfBirth'))
}
export const getPersonFormattedPhoneNumbersSelector = (state, personId) => (
  selectPersonOrEmpty(state, personId)
    .get('phone_numbers', List()).map((phoneNumber) => (
      Map({
        number: phoneNumberFormatter(phoneNumber.get('number')),
        type: phoneNumber.get('type'),
      })
    )
    )
)

export const getReadOnlyPersonFormattedAddressesSelector = (state, personId) => (
  selectFormattedAddresses(state, personId)
).filter(isReadOnly).map((address) => address.delete('zipError'))
