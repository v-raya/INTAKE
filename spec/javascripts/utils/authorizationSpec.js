import {canUserAddClient} from 'utils/authorization'

describe('Authorization Helpers', () => {
  const sacramentan = {
    county: 'Sacramento',
  }

  const clients = {
    sensitive: {
      isSensitive: true,
    },
    nonsensitive: {
      isSensitive: false,
    },
  }
  describe('canUserAddClient', () => {
    it('should deny nonsensitive users from adding sensitive clients', () => {
      expect(
        canUserAddClient(sacramentan, false, clients.sensitive)
      ).toBe(false)
    })

    it('should allow users to add nonsensitive clients', () => {
      expect(
        canUserAddClient(sacramentan, false, clients.nonsensitive)
      ).toBe(true)
    })

    it('should allow sensitive users to add sensitive clients', () => {
      expect(
        canUserAddClient(sacramentan, true, clients.sensitive)
      ).toBe(true)
    })
  })
})
