import React from 'react'
import {Link} from 'react-router'
import {urlHelper} from 'common/url_helper.js.erb'

export const BreadCrumb = () => (
  <div>
    <p>Back to:
      <Link to={urlHelper('/dashboard')}>Dashboard</Link>
    </p>
  </div>
)

