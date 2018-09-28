import PropTypes from 'prop-types'

export const RelationshipPropType = PropTypes.shape({
  absent_parent_code: PropTypes.string,
  age: PropTypes.string,
  dateOfBirth: PropTypes.string,
  legacy_descriptor: PropTypes.object,
  gender: PropTypes.string,
  name: PropTypes.string,
  person_card_exists: PropTypes.bool,
  same_home_code: PropTypes.string,
  secondaryRelationship: PropTypes.string,
  type: PropTypes.string,
  type_code: PropTypes.string,
})
