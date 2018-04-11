import PropTypes from 'prop-types'
import React from 'react'

const attachLink = (onClick, relationship, maybeId) => (
  <a onClick = {() => { onClick(relationship, maybeId) }}>&nbsp;Attach</a>
)

const isPending = (relationship, pendingPeople) =>
  pendingPeople.some((id) => id === (relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id))

export const Relationships = ({people, onClick, screeningId, isScreening, pendingPeople = []}) => (
  <div className='card-body no-pad-top'>
    {
      people.map((person, index) => (
        <div className='row' key={index}>
          <div className='col-md-6 gap-top'>
            <span className='person'>{person.name}</span>
            {
              (person.relationships.length > 0) &&
              <span>
                <strong> is the...</strong>
                <ul className='relationships'>
                  {
                    person.relationships.map((relationship, index) => (
                      <li key={index}>
                        <strong>{ relationship.type }</strong> &nbsp; of { relationship.relatee }
                        {relationship.person_card_exists && !isPending(relationship, pendingPeople) &&
                          (isScreening ? attachLink(onClick, relationship, screeningId) : attachLink(onClick, relationship))
                        }
                      </li>
                    ))
                  }
                </ul>
              </span>
            }
            {
              (person.relationships.length === 0) &&
              <strong className='relationships'> has no known relationships</strong>
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
      type: PropTypes.string,
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
