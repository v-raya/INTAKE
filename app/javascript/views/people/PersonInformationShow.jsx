import AvatarImg from '../../../assets/images/default-profile.svg'
import PropTypes from 'prop-types'
import React from 'react'
import ShowField from 'common/ShowField'
import AlertErrorMessage from 'common/AlertErrorMessage'

const PersonInformationShow = ({
  approximateAge,
  CSECTypes,
  csecEndedAt,
  csecStartedAt,
  dateOfBirth,
  ethnicity,
  gender,
  languages,
  legacySource,
  name,
  races,
  roles,
  ssn,
  alertErrorMessage,
  showCSEC,
}) => (
  <div>
    { alertErrorMessage && <AlertErrorMessage message={alertErrorMessage} /> }
    <div className='row'>
      <div className='col-md-2 avatar-picture'><img src={AvatarImg} alt='Avatar'/></div>
      <div className='col-md-10'>
        {legacySource &&
            <div className='row'><div className='col-md-12'><span>{legacySource}</span></div></div>
        }
        <div className='row'>
          <div className='col-md-6'>
            <ShowField errors={name.errors} required={name.required} label='Name'>{name.value}</ShowField>
          </div>
          <div className='col-md-6'>
            <ShowField label='Role(s)' errors={roles.errors}>
              {roles.value.length > 0 &&
                  <ul>{roles.value.map((role, index) => (<li key={`role-${index}`}>{role}</li>))}</ul>
              }
            </ShowField>
          </div>
          <div className='col-md-6'>
            <ShowField label='Sex at Birth' errors={gender.errors}>{gender.value}</ShowField>
          </div>
          <div className='col-md-6'>
            <ShowField label='Language(s) (Primary First)'>{languages}</ShowField>
          </div>
          <div className='col-md-6'>
            {dateOfBirth && <ShowField errors={dateOfBirth.errors} label='Date of birth'>{dateOfBirth.value}</ShowField>}
            {approximateAge && <ShowField label='Approximate Age'>{approximateAge}</ShowField>}
          </div>
          <div className='col-md-6'>
            <ShowField label='Social security number' errors={ssn.errors}>{ssn.value}</ShowField>
          </div>
        </div>
      </div>
    </div>
    <div className='row gap-top'>
      <ShowField gridClassName='col-md-12' label='Race'>{races}</ShowField>
    </div>
    <div className='row gap-top'>
      <ShowField gridClassName='col-md-12' label='Hispanic/Latino Origin'>
        {ethnicity}
      </ShowField>
    </div>
    {showCSEC &&
    <div>
      <div className='row gap-top'>
        <div className='col-md-4'>
          {CSECTypes &&
          <ShowField label='CSEC Types' errors={CSECTypes.errors}>
            {CSECTypes.value.length > 0 &&
              <ul>{CSECTypes.value.map((CSECType, index) => (<li key={`csecType-${index}`}>{CSECType}</li>))}</ul>
            }
          </ShowField>}
        </div>
        <div className='col-md-4'>
          {csecStartedAt && <ShowField label='CSEC Start Date' errors={csecStartedAt.errors}>{csecStartedAt.value}</ShowField>}
        </div>
        <div className='col-md-4'>
          {csecEndedAt && <ShowField label='CSEC End Date' errors={csecEndedAt.errors}>{csecEndedAt.value}</ShowField>}
        </div>
      </div>
    </div>}
  </div>
)

PersonInformationShow.propTypes = {
  CSECTypes: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.array,
  }),
  alertErrorMessage: PropTypes.string,
  approximateAge: PropTypes.string,
  csecEndedAt: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.string,
  }),
  csecStartedAt: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.string,
  }),
  dateOfBirth: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.string,
  }),
  ethnicity: PropTypes.string,
  gender: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.string,
  }).isRequired,
  languages: PropTypes.string,
  legacySource: PropTypes.string,
  name: PropTypes.shape({
    value: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
  }),
  races: PropTypes.string,
  roles: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.array,
  }),
  showCSEC: PropTypes.bool,
  ssn: PropTypes.shape({
    errors: PropTypes.array,
    value: PropTypes.string,
  }),
}

export default PersonInformationShow
