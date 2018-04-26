import {combineCompact} from 'utils/validator'

const VALID_SSN_LENGTH = 9
const SSN_MIDDLE_SECTION_START = 3
const SSN_MIDDLE_SECTION_END = 5

const validateSSNLength = (ssnWithoutHyphens) => (
  (ssnWithoutHyphens.length > 0 && ssnWithoutHyphens.length < VALID_SSN_LENGTH) ?
    'Social security number must be 9 digits long.' : undefined
)

const validateSSNPrefix = (ssnWithoutHyphens) => (
  ssnWithoutHyphens.startsWith('9') ? 'Social security number cannot begin with 9.' : undefined
)

const validateSSNBeast = (ssnWithoutHyphens) => (
  ssnWithoutHyphens.startsWith('666') ? 'Social security number cannot begin with 666.' : undefined
)

const validateSSNZeroes = (ssnWithoutHyphens) => (
  (
    ssnWithoutHyphens.startsWith('000') ||
    ssnWithoutHyphens.endsWith('0000') ||
    ssnWithoutHyphens.substring(SSN_MIDDLE_SECTION_START, SSN_MIDDLE_SECTION_END) === '00'
  ) ? 'Social security number cannot contain all 0s in a group.' : undefined
)

export const getSSNErrors = (ssnWithoutHyphens) => combineCompact(
  () => validateSSNLength(ssnWithoutHyphens),
  () => validateSSNPrefix(ssnWithoutHyphens),
  () => validateSSNBeast(ssnWithoutHyphens),
  () => validateSSNZeroes(ssnWithoutHyphens)
)
