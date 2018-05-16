import {connect} from 'react-redux'
import RaceForm from 'views/people/RaceForm'
import {RACE_DETAILS} from 'enums/Races'
import {
  getPersonRacesSelector,
  getPersonRaceDetailsSelector,
  getIsRaceIndeterminateValueSelector,
} from 'selectors/screening/personRaceFormSelectors'
import {setField} from 'actions/peopleFormActions'

const mapStateToProps = (state, {personId}) => {
  const raceDetailOptions = Object.keys(RACE_DETAILS).reduce((raceDetails, race) => ({
    ...raceDetails,
    [race]: RACE_DETAILS[race].map((value) => ({label: value, value})),
  }), {})
  return {
    personId,
    raceDetailOptions,
    racesDisabled: getIsRaceIndeterminateValueSelector(state, personId),
    races: getPersonRacesSelector(state, personId).toJS(),
    raceDetails: getPersonRaceDetailsSelector(state, personId).toJS(),
  }
}

const isRaceKnown = (race) => race !== 'Unknown' && race !== 'Abandoned' && race !== 'Declined to answer'

const mapDispatchToProps = (dispatch, {personId}) => ({
  onRaceChange: (changedRace, value) => {
    dispatch(setField(personId, ['races', changedRace], value))
    if (isRaceKnown(changedRace)) { return }

    Object.keys(RACE_DETAILS)
      .filter((race) => race !== changedRace)
      .forEach((race) => dispatch(setField(personId, ['races', race], false)))
  },
  onRaceDetailChange: (changedRace, value) => {
    dispatch(setField(personId, ['race_details', changedRace], value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RaceForm)
