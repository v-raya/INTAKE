import React from 'react'

export const optionsOf = (ENUM) =>
  Object.keys(ENUM)
    .map((key) => (<option key={key} value={key}>{ENUM[key]}</option>))
