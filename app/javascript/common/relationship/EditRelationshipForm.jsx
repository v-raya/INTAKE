import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import DateField from 'common/DateField'
import {RELATIONSHIP_TYPES} from 'enums/RelationshipTypes'
import {GENDERS_LEGACY} from 'enums/Genders'

const propTypes = {
  onChange: PropTypes.func,
  person: PropTypes.object,
  relationship: PropTypes.object,
}
const isAbsentParentDisabled = (type) => (
  !type.toLowerCase().match(/\bfather\b|\bmother\b|\bparent\b/)
)
const findTypeLabel = (typeCode) => {
  const types = (RELATIONSHIP_TYPES.find((type) => type.value === typeCode).label).split('/')
  return {
    secondary: types.pop(),
    index: types.pop(),
  }
}
const EditRelationshipForm = ({onChange, person, relationship}) => {
  const type = findTypeLabel(relationship.type_code)

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th className='col-md-3'>Focus Person</th>
            <th className='col-md-6'>
              Relationship
              <div className='text-helper'>
                Focus Person / Related Person
              </div>
            </th>
            <th className='col-md-3'>Related Person</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul className='unstyled-list'>
                <li>{person.name}</li>
                <li>{person.dateOfBirth}</li>
                <li>{GENDERS_LEGACY[person.gender] || ''}</li>
              </ul>
            </td>
            <td>
              <select
                id='edit_relationship'
                label='Relationship Type'
                value={relationship.type_code}
                aria-label='Relationship Type'
                onChange={({target}) => onChange('indexed_person_relationship', person.legacy_id, relationship, target.value)}
              >
                <option key=''/>
                {RELATIONSHIP_TYPES.map((relationship) =>
                  <option key={relationship.value} value={relationship.value}>
                    {relationship.label}
                  </option>
                )}
              </select>
            </td>
            <td>
              <ul className='unstyled-list'>
                <li>{relationship.name}</li>
                <li>{relationship.dateOfBirth}</li>
                <li>{GENDERS_LEGACY[relationship.gender]}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='row gap-top pad-left'>
        <div className='col-md-12'>
          <span>
            {person.name} is the {type.index} of {type.secondary} {relationship.name}
          </span>
        </div>
      </div>
      <div className='row pad-left'>
        <div className='col-md-4'>
          <CheckboxField
            checked={relationship.same_home_code === 'Y'}
            id='same_home_code'
            label='Live at the Same Location'
            onChange={({target}) => {
              onChange('same_home_code', person.legacy_id, relationship, (target.value === 'Y') ? 'N' : 'Y')
            }}
            required={false}
            value={relationship.same_home_code}
          />
        </div>
        <div className='col-md-4'>
          <CheckboxField
            checked={relationship.absent_parent_code === 'Y'}
            disabled={isAbsentParentDisabled(type.secondary)}
            id='absent_parent_code'
            label='Parents Whereabouts Unknown'
            onChange={({target}) => {
              onChange('absent_parent_code', person.legacy_id, relationship, (target.value === 'Y') ? 'N' : 'Y')
            }}
            required={false}
            value={relationship.absent_parent_code}
          />
        </div>
      </div>
      <div className='row pad-left'>
        <DateField
          gridClassName='col-md-4'
          id='relationship_start_date'
          label='Start Date'
          value={''}
          onChange={() => {}}
          hasTime={false}
        />
        <DateField
          gridClassName='col-md-4'
          id='relationship_end_date'
          label='End Date'
          value={''}
          onChange={() => {}}
          hasTime={false}
        />
      </div>
    </div>
  )
}
EditRelationshipForm.propTypes = propTypes

export default EditRelationshipForm
