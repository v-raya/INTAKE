import {RELATIONSHIP_TYPES} from 'enums/RelationshipTypes'
import moment from 'moment'

const MALE_CODES = ['M', 'm', 'U']
const FEMALE_CODES = ['F', 'f', 'U']
const YOUNGER_CODES = ['f', 'm']
const PRIMARY = 0
const SECONDARY = 1

const isCompatible = (index, codes, type) => codes.includes(type.gender_code[index])

const isOlder = (clientA, clientB) => {
  const clientAdateOfBirth = clientA.estimated_dob_code === 'Y' ? clientA.estimated_date_of_birth : clientA.dateOfBirth
  const clientBdateOfBirth = clientB.estimated_dob_code === 'Y' ? clientB.estimated_date_of_birth : clientB.dateOfBirth
  return clientAdateOfBirth && clientBdateOfBirth &&
  moment(clientAdateOfBirth, 'MM/DD/YYYY') < moment(clientBdateOfBirth, 'MM/DD/YYYY')
}

const areGendersCompatible = (client, index) => (type) =>
  (isCompatible(index, MALE_CODES, type) || client.gender_code !== 'M') &&
  (isCompatible(index, FEMALE_CODES, type) || client.gender_code !== 'F')

const areAgesCompatible = (primaryClient, secondaryClient) => (type) =>
  !(isCompatible(PRIMARY, YOUNGER_CODES, type) && isOlder(primaryClient, secondaryClient)) &&
  !(isCompatible(SECONDARY, YOUNGER_CODES, type) && isOlder(secondaryClient, primaryClient))

const sortOptions = (rec1, rec2) => {
  const higher = 1
  const lower = -1
  let returnValue = 0
  if (rec1.label > rec2.label) { returnValue = higher }
  if (rec1.label < rec2.label) { returnValue = lower }
  return returnValue
}

const relationshipDropdown = (primaryClient, secondaryClient) =>
  RELATIONSHIP_TYPES
    .filter(areGendersCompatible(primaryClient, PRIMARY))
    .filter(areGendersCompatible(secondaryClient, SECONDARY))
    .filter(areAgesCompatible(primaryClient, secondaryClient))
    .filter((rec) => !rec.label.match(/\*/))
    .sort(sortOptions)

export default relationshipDropdown
