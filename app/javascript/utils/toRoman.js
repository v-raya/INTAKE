import {default as lookup} from 'enums/RomanArabicMapping'

export const toRoman = (num) => {
  let result = ''
  let i = ''
  for (i in lookup) {
    while (num >= lookup[i]) {
      result += i
      num -= lookup[i]
    }
  }
  return result
}
