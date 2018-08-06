import React from 'react'

const SnapshotIntro = () => (
  <div className='card edit double-gap-bottom' id='snapshot-card'>
    <div className='card-body'>
      <div className='row'>
        <div className='col-md-12'>
          <h2 className='hidden'>Introduction</h2>
          <div className='double-pad-top'>
            The Child Welfare History Snapshot allows you to search CWS/CMS for people and their past history with CWS.
            To start, search by any combination of name, date of birth, or social security number. Click on a person from
            the results to add them to the Snapshot, and their basic information and history will automatically appear below.
            You can add as many people as you like, and when ready, copy the summary of their history.
            You will need to manually paste it into a document or a field in CWS/CMS.
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default SnapshotIntro
