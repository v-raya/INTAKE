import PropTypes from 'prop-types'
import React from 'react'
import RelationCard from './RelationCard'

const attachLink = (onClick, relationship, maybeId) => (
  <a className='hidden-print' onClick = {() => { onClick(relationship, maybeId) }}>&nbsp;Attach</a>
)

const isPending = (relationship, pendingPeople) =>
  pendingPeople.some((id) => id === (relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id))

const callAttachLink = (relationship, pendingPeople, isScreening, screeningId, onClick) => {
  if (relationship.person_card_exists && !isPending(relationship, pendingPeople)) {
    return (isScreening ? attachLink(onClick, relationship, screeningId) : attachLink(onClick, relationship))
  } else { return '' }
}

export const Relationships = ({people, onClick, screeningId, isScreening, pendingPeople = []}) => (

  <div className='card-body no-pad-top'>
    {
      isScreening && people.map((person, index) => (
        <div className='row' key={`new-${index}`}>
          <div className='col-md-12'>
            {
              (person.relationships.length > 0) &&
              <span>
                <RelationCard firstName={person.name} data={person.relationships}
                  attachActions={(cell, row) => (callAttachLink(row, pendingPeople, isScreening, screeningId, onClick)
                  )}
                />
              </span>
            }
            {
              (person.relationships.length === 0) &&
              <div className='no-relationships well'><strong>{person.name}</strong> has no known relationships</div>
            }
          </div>
        </div>
      ))
    }
  </div>
)

Relationships.propTypes = {
  isScreening: PropTypes.bool,
  onClick: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    relationships: PropTypes.arrayOf(PropTypes.shape({
      relatee: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      secondaryRelationship: PropTypes.string,
    })),
  })),
  screeningId: PropTypes.string,
}

export const EmptyRelationships = () => (
  <div className='card-body no-pad-top'>
    <div className='row'>
      <div className='col-md-12 empty-relationships'>
        <div className='double-gap-top  centered'>
          <span className='c-dark-grey'>Search for people and add them to see their relationships.</span>
        </div>
      </div>
    </div>
  </div>
)
