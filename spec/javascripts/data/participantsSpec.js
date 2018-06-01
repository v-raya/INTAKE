import {
  babyDoe,
  parentDoe,
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
    it('is a victim', () => {
      expect(babyDoe.roles).toEqual(['Victim'])
    })

    it('has SSB info', () => {
      expect(babyDoe.safelySurrenderedBabies).toBeDefined()
    })
  })

  describe('Parent Doe', () => {
    it('is named Unknown Doe', () => {
      expect(parentDoe.first_name).toBe('Unknown')
      expect(parentDoe.last_name).toBe('Doe')
    })

    it('has no id, descriptor, or screening', () => {
      expect(parentDoe.id).toBeUndefined()
      expect(parentDoe.legacy_descriptor).toBeUndefined()
      expect(parentDoe.screening_id).toBeUndefined()
    })

    it('is a perpetrator', () => {
      expect(parentDoe.roles).toEqual(['Perpetrator'])
    })

    it('has an approximate age of 0 days', () => {
      // Yes, this is definitely intended for the parent, not the child.
      expect(parentDoe.approximate_age).toEqual(0)
      expect(parentDoe.approximate_age_units).toEqual('days')
    })
  })
})
