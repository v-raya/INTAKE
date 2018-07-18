import AGE_UNITS from 'enums/AgeUnits'

export const ageFormatter = ({age, ageUnit}) => (
  (age) && (age > 0) && (ageUnit) && (AGE_UNITS[ageUnit]) ? `(${age} ${AGE_UNITS[ageUnit]})` : ''
)
