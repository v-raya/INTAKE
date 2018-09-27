import React from 'react'
import ErrorPage from 'errors/ErrorPage'

const ForbiddenPage = () => (
  <ErrorPage
    message='This page is restricted.'
    details="You don't have the appropriate permissions to view this page."
  />
)

export default ForbiddenPage
