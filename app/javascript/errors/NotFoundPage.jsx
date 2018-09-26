import React from 'react'
import ErrorPage from 'errors/ErrorPage'

const NotFoundPage = () => (
  <ErrorPage
    message='Sorry, this is not the page you want.'
    details="It may have been deleted or doesn't exist. Please check the address or"
  />
)

export default NotFoundPage
