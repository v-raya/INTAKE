import NAME_SUFFIXES from 'enums/NameSuffixes'
import {toRoman} from 'utils/toRoman'
import {fromRoman} from 'utils/fromRoman'

const addSuffix = (name, suffix) => {
  if (['0', '1', 'i'].includes(suffix)) {
    return name
  } else if (toRoman(suffix) !== '') {
    return `${name} ${toRoman(suffix)}`
  } else if (fromRoman(suffix) > 0) {
    return `${name} ${suffix.toUpperCase()}`
  } else {
    return name
  }
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
