import COUNTY from 'data/lov/county'
export default COUNTY.map(({countyTypeCode, value}) => ({
  category: 'county_type',
  sub_category: null,
  code: countyTypeCode,
  value,
}))
