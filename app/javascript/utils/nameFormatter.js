import NAME_SUFFIXES from 'enums/NameSuffixes'
import {toRoman} from 'utils/toRoman'
import {fromRoman} from 'utils/fromRoman'

const addSuffix = (name, suffix) => {
  let fullName = name
  if (['0', '1', 'i'].includes(suffix)) {
    fullName = name
  } else if (Object.keys(NAME_SUFFIXES).includes(suffix)) {
    fullName = `${name}, ${NAME_SUFFIXES[suffix]}`
  } else if (toRoman(suffix) !== '') {
    fullName = `${name} ${toRoman(suffix)}`
  } else if (fromRoman(suffix) > 0) {
    fullName = `${name} ${suffix.toUpperCase()}`
  }
  return fullName
}

const nameFormatter = ({
  first_name,
  last_name,
  middle_name,
  name_suffix,
  name_default = 'Unknown Person',
}) => {
  if (first_name || last_name) {
    const name = [
      first_name || '(Unknown first name)',
      middle_name,
      last_name || '(Unknown last name)',
    ].filter(Boolean).join(' ')

    return addSuffix(name, name_suffix)
  }

  if (middle_name) {
    const name = `Unknown ${middle_name}`
    return addSuffix(name, name_suffix)
  }

  return name_default
}

export default nameFormatter
