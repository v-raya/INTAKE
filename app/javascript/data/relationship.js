import {Map} from 'immutable'
import PropTypes from 'prop-types'

export const RelationshipPropType = PropTypes.shape({
  absent_parent_indicator: PropTypes.bool,
  client_id: PropTypes.string,
  end_date: PropTypes.string,
  legacy_id: PropTypes.string,
  relationship_type: PropTypes.number,
  relative_id: PropTypes.string,
  same_home_status: PropTypes.string,
  start_date: PropTypes.string,
})

export const fromFerbRelationship = (person, relationship) => (Map({
  absent_parent_indicator: (relationship.get('absent_parent_code') === 'Y') || false,
  client_id: person.get('id'),
  end_date: relationship.get('endDate') || '',
  legacy_id: relationship.get('legacy_id') || '',
  relationship_type: parseInt(relationship.get('type_code'), 10),
  relative_id: relationship.get('id'),
  same_home_status: relationship.get('same_home_code') || 'N',
  start_date: relationship.get('startDate') || '',
}))
