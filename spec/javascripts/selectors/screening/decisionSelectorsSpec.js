import {List, fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {
  validateReporterRequired,
  selectCasesAndReferrals,
  validateScreeningContactReference,
  validateScreeningDecisionDetail,
  validateAllegations,
} from 'selectors/screening/decisionSelectors'

describe('decisionSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('validateReporterRequired', () => {
    it('returns Nothing if the decision is "info to cws" and there is a reporter', () => {
      expect(
        validateReporterRequired(
          'information_to_child_welfare_services',
          ['Mandated Reporter']
        ).isNothing()
      ).toEqual(true)
    })
    it('returns Nothing if the decision is not "info to cws" and there is a reporter', () => {
      expect(
        validateReporterRequired('promote_to_referral', ['Mandated Reporter'])
          .isNothing()
      ).toEqual(true)
    })
    it('returns an error if the decision is "info to cws" and there are no reporters', () => {
      expect(
        validateReporterRequired(
          'information_to_child_welfare_services',
          ['Victim']
        ).valueOrElse()
      ).toEqual('A reporter is required to submit a screening Contact')
    })
    it('returns an error if the decision is "info to cws" and there are no roles at all', () => {
      expect(
        validateReporterRequired('information_to_child_welfare_services', [])
          .valueOrElse()
      ).toEqual('A reporter is required to submit a screening Contact')
    })
    it('requires a reporter to promote a screening to referral', () => {
      expect(
        validateReporterRequired('promote_to_referral', ['Victim'])
          .valueOrElse()
      ).toEqual('A reporter is required to promote to referral')
    })
  })

  describe('selectCasesAndReferrals', () => {
    const state = fromJS({
      involvements: {
        cases: [
          {
            legacy_descriptor: {legacy_id: 'adfe2ese'},
            start_date: '2007-11-11',
            id: 'dfsa',
          },
          {
            legacy_descriptor: {legacy_id: 'd232321'},
            start_date: '2008-11-11',
            id: 'dd121',
            focus_child: {},
          },
          {
            legacy_descriptor: {legacy_id: 'd232321'},
            start_date: '2008-11-11',
            id: 'ddda',
            focus_child: {},
          },
        ],
        referrals: [
          {
            legacy_descriptor: {legacy_id: 'kjfds'},
            start_date: '2009-11-11',
            end_date: '2011-09-09',
            reporter: {},
            county: {}},
        ],
      },
    })

    it('returns a single list of cases and referrals', () => {
      expect(selectCasesAndReferrals(state).size).toEqual(4)
    })
  })

  describe('validateScreeningContactReference', () => {
    const decision = 'information_to_child_welfare_services'
    const casesAndReferrals = fromJS([
      {
        start_date: '01/01/2014',
        end_date: '01/01/2015',
        legacy_descriptor: {
          legacy_ui_id: 'closedcaseid',
        },
      },
      {
        start_date: '01/01/2014',
        legacy_descriptor: {
          legacy_ui_id: 'opencaseid',
        },
      },
      {
        start_date: '01/01/2014',
        legacy_descriptor: {
          legacy_ui_id: '22312321',
        },
      },
    ])

    it('does not return an error if the id references an open item and "info to cws" is the decision', () => {
      expect(validateScreeningContactReference(casesAndReferrals, 'opencaseid', decision)).toBeUndefined()
    })
    it('returns an error if the id provided is from a closed case', () => {
      expect(validateScreeningContactReference(casesAndReferrals, 'closedcaseid', decision)).toEqual('Please enter a valid Case or Referral Id')
    })
    it('does not return an error if the decision is not "info to cws"', () => {
      expect(validateScreeningContactReference(casesAndReferrals, 'closedcaseid', 'promote_to_something')).toBeUndefined()
    })
    it('returns an error when the list of cases/referrals is empty', () => {
      expect(validateScreeningContactReference(List(), 'closedcaseid', decision)).toEqual('Please enter a valid Case or Referral Id')
    })
  })

  describe('validateScreeningDecisionDetail', () => {
    it('returns an error when the decision detail is not provided', () => {
      expect(validateScreeningDecisionDetail('promote_to_referral', '')).toEqual('Please enter a response time')
    })
    it('returns undefined when the decision detail is provided', () => {
      expect(validateScreeningDecisionDetail('promote_to_referral', '3 days')).toBeUndefined()
    })
    it('returns undefined when the decision is not promote to referral', () => {
      expect(validateScreeningDecisionDetail('', '3 days')).toBeUndefined()
    })
  })

  describe('validateAllegations', () => {
    it('returns an error when allegationtypes are empty', () => {
      const allegations = fromJS([{allegationTypes: []}, {allegationTypes: []}])
      expect(validateAllegations('promote_to_referral', allegations)).toEqual('Please enter at least one allegation to promote to referral.')
    })
    it('returns undefined when the allegations have types', () => {
      const allegations = fromJS([{allegationTypes: ['General neglect']}, {allegationTypes: []}])
      expect(validateAllegations('promote_to_referral', allegations)).toBeUndefined()
    })
  })
})
