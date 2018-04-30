import NAME_SUFFIXES from 'enums/NameSuffixes'
import NUMBER_SUFFIXES from 'enums/NumberSuffixes'

export const isCommaSuffix = (suffix) => Boolean(
  (typeof suffix === 'string') && NAME_SUFFIXES[suffix.toLowerCase()]
)

export const formatNameSuffix = (suffix) => {
  const downCaseSuffix = (typeof suffix === 'string') && suffix.toLowerCase()
  return NAME_SUFFIXES[downCaseSuffix] || NUMBER_SUFFIXES[downCaseSuffix]
}

export const formatHighlightedSuffix = (highlightedSuffix) => {
  if (typeof highlightedSuffix !== 'string') { return null }

  const suffix = highlightedSuffix.replace(/<\/?em>/gi, '')
  const formattedSuffix = formatNameSuffix(suffix)
  const rehighlightedSuffix = suffix === highlightedSuffix ?
    formattedSuffix : `<em>${formattedSuffix}</em>`

  return rehighlightedSuffix
}

export const addSuffix = (name, suffix) => {
  const validSuffix = formatNameSuffix(suffix)

  if (!validSuffix) { return name }

  return `${name}${isCommaSuffix(suffix) ? ',' : ''} ${validSuffix}`
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
