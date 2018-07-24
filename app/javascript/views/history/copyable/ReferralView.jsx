import React from 'react'
import PropTypes from 'prop-types'

const CopyableReferralView = ({
  county,
  dateRange,
  index,
  notification,
  peopleAndRoles,
  referralId,
  status,
  worker,
}) => (
  <tr>
    <td><span>{index ? `${index}.` : ''}</span></td>
    <td>{dateRange}</td>
    <td>
      <div className='referral'>Referral</div>
      <div className='referral-status'>({status})</div>
      <div className='referral-id'>{referralId}</div>
      {notification && <div className='information-flag'>{notification}</div>}
    </td>
    <td>{county}</td>
    <td>
      <table className='people-and-roles' style={{border: '1px solid black'}}>
        <colgroup>
          <col/>
          <col/>
          <col/>
        </colgroup>
        <thead>
          <tr>
            <th className='victim semibold'>Victim</th>
            <th className='perpetrator semibold'>Perpetrator</th>
            <th className='allegations disposition semibold'>Allegation(s) &amp; Disposition</th>
          </tr>
        </thead>
        <tbody>
          {
            peopleAndRoles.map(({victim, perpetrator, allegations, disposition}, index) => (
              <tr key={index}>
                <td className='victim'>{victim}</td>
                <td className='perpetrator'>{perpetrator}</td>
                <td className='allegations disposition'>{allegations} {disposition}</td>
              </tr>
            ))
          }
          <tr>
            <td colSpan='2' className='un-selectable'/>
            <td>
              <span className='semibold'>Worker: </span>{worker}
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
)

CopyableReferralView.propTypes = {
  county: PropTypes.string,
  dateRange: PropTypes.string,
  index: PropTypes.number,
  notification: PropTypes.string,
  peopleAndRoles: PropTypes.arrayOf(PropTypes.shape({
    allegations: PropTypes.string,
    disposition: PropTypes.string,
    perpetrator: PropTypes.string,
    victim: PropTypes.string,
  })),
  referralId: PropTypes.string,
  status: PropTypes.string,
  worker: PropTypes.string,
}

export default CopyableReferralView
