import {default as lookup} from 'enums/RomanArabicMapping'

export const fromRoman = (str) => {
  if (typeof (str) !== 'string') return ''
  let result = 0
  let upCaseString = str.toUpperCase()
  for (let i = 0; i <= Object.keys(lookup).length; i++) {
    while (upCaseString.indexOf(Object.keys(lookup)[i]) === 0) {
      result += Object.values(lookup)[i]
      upCaseString = upCaseString.replace(Object.keys(lookup)[i], '')
    }
  }
  return result
}
