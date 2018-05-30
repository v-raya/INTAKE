import {
  babyDoe,
} from 'data/participants'

describe('Participants', () => {
  describe('Baby Doe', () => {
    it('is named Baby Doe', () => {
      expect(babyDoe.first_name).toBe('Baby')
      expect(babyDoe.last_name).toBe('Doe')
    })

    it('has no id, descriptor, or screening', () => {
      expect(babyDoe.id).toBeUndefined()
      expect(babyDoe.legacy_descriptor).toBeUndefined()
      expect(babyDoe.screening_id).toBeUndefined()
    })

    it('has an approximate age of 0 days', () => {
      expect(babyDoe.approximate_age).toEqual(0)
      expect(babyDoe.approximate_age_units).toEqual('days')
    })

    it('is a victim', () => {
      expect(babyDoe.roles).toEqual(['Victim'])
    })

    it('has SSB info', () => {
      expect(babyDoe.safelySurrenderedBabies).toBeDefined()
    })
  })
})
