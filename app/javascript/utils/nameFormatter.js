import NAME_SUFFIXES from 'enums/NameSuffixes'

const addSuffix = (name, suffix) => {
  if (['ii', 'iii', 'iv', '2', '3', '4'].includes(suffix)) {
    return `${name} ${NAME_SUFFIXES[suffix]}`
  } else if (['0', '1'].includes(suffix)) {
    return name
  } else if (suffix) {
    return `${name}, ${suffix}`
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
