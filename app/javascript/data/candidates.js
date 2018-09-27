import PropTypes from 'prop-types'

export const CandidatesPropType = PropTypes.arrayOf(PropTypes.shape({
  candidate: PropTypes.shape({
    age: PropTypes.string,
    candidate_id: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  person: PropTypes.shape({
    age: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    id: PropTypes.string,
    legacy_id: PropTypes.string,
    name: PropTypes.string,
  }),
}))
