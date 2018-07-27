import React from 'react'
import PropTypes from 'prop-types'

const attachLink = (onClick, relationship, maybeId) => (
  <a href='#' aria-label='attachRelationship' className='hidden-print' onClick = {() => { onClick(relationship, maybeId) }}>&nbsp;Attach</a>
)

const isPending = (relationship, pendingPeople) =>
  pendingPeople.some((id) => id === (relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id))

const callAttachLink = (isScreening, onClick, pendingPeople, relationship, screeningId) => {
  if (relationship.person_card_exists && !isPending(relationship, pendingPeople)) {
    return (isScreening ? attachLink(onClick, relationship, screeningId) : attachLink(onClick, relationship))
  } else {
    return null
  }
}

export const AttachLink = ({isScreening, onClick, pendingPeople, relationship, screeningId}) =>
  callAttachLink(isScreening, onClick, pendingPeople, relationship, screeningId)

AttachLink.propTypes = {
  isScreening: PropTypes.bool,
  onClick: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  relationship: PropTypes.object,
  screeningId: PropTypes.string,
}

export default AttachLink
