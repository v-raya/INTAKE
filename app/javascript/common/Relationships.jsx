import PropTypes from 'prop-types'
import React from 'react'
import ActionMenu from 'common/relationship/ActionMenu'
import AttachLink from 'common/relationship/AttachLink'
import RelationCard from 'common/relationship/RelationCard'
import ScreeningCreateRelationshipContainer from 'containers/screenings/ScreeningCreateRelationshipContainer'

export const Relationships = ({
  candidates,
  editFormRelationship,
  people,
  onChange,
  onClick,
  onEdit,
  onSave,
  screeningId,
  isScreening,
  pendingPeople = [],
}) => (
  <div className='card-body no-pad-top'>
    {
      isScreening && people.map((person, index) => (
        <div key={index}>
          <div className='row' key={`new-${index}`}>
            <div className='col-md-12'>
              {
                (person.relationships.length > 0) &&
                <span>
                  <RelationCard
                    name={person.name}
                    data={person.relationships}
                    tableActions={(cell, row) =>
                      <ActionMenu
                        editFormRelationship={editFormRelationship}
                        isScreening={isScreening}
                        onChange={onChange}
                        onClick={onClick}
                        onEdit={onEdit}
                        onSave={onSave}
                        pendingPeople={pendingPeople}
                        person={person}
                        relationship ={row}
                        screeningId={screeningId}
                      />
                    }
                    ageDisplayFormatter={(cell, row) => <div> {row.dateOfBirth || ''} {row.age === '' ? '' : `(${row.age})`}</div>}
                  />
                </span>
              }
              {
                (person.relationships.length === 0) &&
                <div className='no-relationships well'><strong>{person.name}</strong> has no known relationships</div>
              }
            </div>
          </div>
          <ScreeningCreateRelationshipContainer personId={person.id} candidates={candidates} />
        </div>
      ))
    }
    {
      !isScreening && people.map((person, index) => (
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
                        <strong>{ relationship.type }</strong> &nbsp; of { relationship.name }
                        <AttachLink
                          isScreening={isScreening}
                          onClick={onClick}
                          pendingPeople={pendingPeople}
                          relationship={relationship}
                          screeningId={screeningId}
                        />
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
            <div id='relationships-list'/>
          </div>
        </div>
      ))
    }
  </div>
)

Relationships.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({
    candidate: PropTypes.shape({
      age: PropTypes.string,
      candidateId: PropTypes.string,
      dateOfBirth: PropTypes.string,
      gender: PropTypes.string,
      name: PropTypes.string,
    }),
    person: PropTypes.shape({
      age: PropTypes.string,
      legacyId: PropTypes.string,
      dateOfBirth: PropTypes.string,
      gender: PropTypes.string,
      name: PropTypes.string,
    }),
  })),
  editFormRelationship: PropTypes.shape({
    absent_parent_indicator: PropTypes.bool,
    client_id: PropTypes.string,
    end_date: PropTypes.string,
    id: PropTypes.string,
    relationship_type: PropTypes.number,
    relative_id: PropTypes.string,
    same_home_status: PropTypes.string,
    start_date: PropTypes.string,
  }),
  isScreening: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    relationships: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      secondaryRelationship: PropTypes.string,
      age: PropTypes.string,
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
