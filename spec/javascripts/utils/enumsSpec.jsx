import {optionsOf} from 'utils/enums'

describe('Enums Utils', () => {
  describe('optionsOf', () => {
    it('converts an Object enum into a list of options', () => {
      const COUNT = {
        one: 'Ichi',
        two: 'Ni',
        three: 'San',
      }
      const options = optionsOf(COUNT)
      expect(options.every((option) => option.type === 'option')).toEqual(true)
      expect(options[0].key).toEqual('one')
      expect(options[0].props.value).toEqual('one')
      expect(options[0].props.children).toEqual('Ichi')
      expect(options[1].key).toEqual('two')
      expect(options[1].props.value).toEqual('two')
      expect(options[1].props.children).toEqual('Ni')
      expect(options[2].key).toEqual('three')
      expect(options[2].props.value).toEqual('three')
      expect(options[2].props.children).toEqual('San')
    })
  })
})
