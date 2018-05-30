import {List} from 'immutable'
export const findByCategory = (statusCodes = List(), selectedCategory) => (
  statusCodes.filter(({category}) => category === selectedCategory)
)

export const buildSelector = (...funcs) => {
  const selector = funcs.pop()
  return (...args) => selector(...(funcs.map((f) => (f(...args)))))
}
