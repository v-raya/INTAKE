import NAME_SUFFIXES from 'enums/NameSuffixes'
import NUMBER_SUFFIXES from 'enums/NumberSuffixes'

export const addSuffix = (name, suffix) => {
  if (suffix === undefined || suffix === null) return name

  const nameSuffix = suffix
  const stringSuffix = nameSuffix.toString()
  const downCaseSuffix = stringSuffix.toLowerCase()

  if (NAME_SUFFIXES[downCaseSuffix]) {
    return `${name}, ${NAME_SUFFIXES[downCaseSuffix]}`
  } else if (NUMBER_SUFFIXES[downCaseSuffix]) {
    return `${name} ${NUMBER_SUFFIXES[downCaseSuffix]}`
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
