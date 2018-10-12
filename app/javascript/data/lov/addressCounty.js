import COUNTY from 'data/lov/county'
export default COUNTY.map(({addressCountyCode, value}) => ({
  category: 'address_county',
  sub_category: null,
  code: addressCountyCode,
  value,
}))
