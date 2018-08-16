import {List, Map, fromJS} from 'immutable'
import {
  getAccessRestrictionOptionsSelector,
  getDecisionAlertErrorMessageSelector,
  getDecisionDetailOptionsSelector,
  getDecisionDetailSelector,
  getDecisionDetailValueSelector,
  getDecisionFormSelector,
  getDecisionOptionsSelector,
  getDecisionSelector,
  getDecisionValueSelector,
  getScreeningWithEditsSelector,
  getAdditionalInformationSelector,
  getAccessRestrictionSelector,
  getRestrictionRationaleSelector,
  getErrorsSelector,
  getVisibleErrorsSelector,
  getAdditionalInfoRequiredSelector,
  selectContactReferenceValue,
  selectContactReference,
} from 'selectors/screening/decisionFormSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('decisionFormSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getDecisionOptionsSelector', () => {
    it('returns information to child welfare services when HOI contains at least 1 open cases/referrals', () => {
      const state = fromJS({
        involvements: {
          referrals: [{
            start_date: '01/01/2014',
          }],
          cases: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
          }],
        },
      })
      expect(getDecisionOptionsSelector(state)).toEqualImmutable(fromJS([
        {value: 'differential_response', label: 'Differential response'},
        {value: 'information_to_child_welfare_services', label: 'Information to child welfare services'},
        {value: 'promote_to_referral', label: 'Promote to referral'},
        {value: 'screen_out', label: 'Screen out'},
      ]))
    })

    it('do not return information to child welfare services when HOI contains only closed cases/referrals', () => {
      const state = fromJS({
        involvements: {
          referrals: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
          }],
          cases: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
          }],
        },
      })
      expect(getDecisionOptionsSelector(state)).toEqualImmutable(fromJS([
        {value: 'differential_response', label: 'Differential response'},
        {value: 'promote_to_referral', label: 'Promote to referral'},
        {value: 'screen_out', label: 'Screen out'},
      ]))
    })

    it('returns enums from screenings decisions except information to child welfare services by default', () => {
      const state = fromJS({})
      expect(getDecisionOptionsSelector(state)).toEqualImmutable(fromJS([
        {value: 'differential_response', label: 'Differential response'},
        {value: 'promote_to_referral', label: 'Promote to referral'},
        {value: 'screen_out', label: 'Screen out'},
      ]))
    })
  })

  describe('getAccessRestrictionOptionsSelector', () => {
    it('returns the enums for screening decisions in an object form with value and label', () => {
      expect(getAccessRestrictionOptionsSelector()).toEqualImmutable(fromJS([
        {value: '', label: 'Do not restrict access'},
        {value: 'sensitive', label: 'Mark as Sensitive'},
        {value: 'sealed', label: 'Mark as Sealed'},
      ]))
    })
  })

  describe('getDecisionFormSelector', () => {
    it('returns the decision form if one exists', () => {
      const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionFormSelector(state)).toEqualImmutable(fromJS(screeningDecisionForm))
    })

    it('returns an empty map if no form exists', () => {
      const state = fromJS({})
      expect(getDecisionFormSelector(state)).toEqualImmutable(Map())
    })
  })

  describe('getDecisionValueSelector', () => {
    it('returns the value from the screening form, if present', () => {
      const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionValueSelector(state)).toEqual('promote_to_referral')
    })
  })

  describe('getDecisionDetailValueSelector', () => {
    it('returns the value from the screening form, if present', () => {
      const screeningDecisionForm = {screening_decision_detail: {value: '3_day'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailValueSelector(state)).toEqual('3_day')
    })
  })

  describe('getDecisionDetailSelector', () => {
    it('returns the proper value', () => {
      const screeningDecisionForm = {screening_decision_detail: {value: '3_day'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('value')).toEqual('3_day')
    })

    it('returns an empty string if value is set to null', () => {
      const screeningDecisionForm = {screening_decision_detail: {value: null}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('value')).toEqual('')
    })

    it('returns a list of errors', () => {
      const screeningDecisionForm = {screening_decision_detail: {value: '3_day'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('errors')).toEqualImmutable(List())
    })

    it('returns the proper label based on screening decision', () => {
      const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('label')).toEqual('Response Time')
    })

    it('returns an empty string if no valid label is found', () => {
      const screeningDecisionForm = {screening_decision: {value: ''}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('label')).toEqual('')
    })

    it('sets required to true if decision is promote_to_referral', () => {
      const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('required')).toEqual(true)
    })

    it('sets required to false if decision is not promote_to_referral', () => {
      const screeningDecisionForm = {screening_decision: {value: 'screen_out'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailSelector(state).get('required')).toEqual(false)
    })
  })

  describe('getDecisionSelector', () => {
    it('returns the proper value and a list of errors', () => {
      const screeningDecisionForm = {screening_decision: {value: 'screen_out'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionSelector(state)).toEqualImmutable(fromJS({
        value: 'screen_out',
        errors: [],
      }))
    })
  })

  describe('getAdditionalInfoRequiredSelector', () => {
    it('returns true if screening decision is screen_out and screening_decision_detail is evaluate_out', () => {
      const screeningDecisionForm = {screening_decision: {value: 'screen_out'}, screening_decision_detail: {value: 'evaluate_out'}}
      const state = fromJS({screeningDecisionForm})
      expect(getAdditionalInfoRequiredSelector(state)).toEqualImmutable(fromJS(true))
    })

    it('returns false if screening decision is screen_out and screening_decision_detail is not evaluate_out', () => {
      const screeningDecisionForm = {screening_decision: {value: 'screen_out'}, screening_decision_detail: {value: 'not evaluate_out'}}
      const state = fromJS({screeningDecisionForm})
      expect(getAdditionalInfoRequiredSelector(state)).toEqualImmutable(fromJS(false))
    })

    it('returns false if screening decision is not screen_out', () => {
      const screeningDecisionForm = {screening_decision: {value: 'not screen_out'}, screening_decision_detail: {value: 'evaluate_out'}}
      const state = fromJS({screeningDecisionForm})
      expect(getAdditionalInfoRequiredSelector(state)).toEqualImmutable(fromJS(false))
    })
  })

  describe('getDecisionDetailOptionsSelector', () => {
    it('returns formatted options when decision detail has options', () => {
      const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailOptionsSelector(state)).toEqualImmutable(fromJS([
        {value: 'immediate', label: 'Immediate'},
        {value: '3_days', label: '3 days'},
        {value: '5_days', label: '5 days'},
        {value: '10_days', label: '10 days'},
      ]))
    })

    it('returns an empty list if decision detail has no options', () => {
      const screeningDecisionForm = {screening_decision: {value: 'differential_response'}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailOptionsSelector(state)).toEqualImmutable(List())
    })

    it('returns an empty list if decision is empty', () => {
      const screeningDecisionForm = {screening_decision: {value: ''}}
      const state = fromJS({screeningDecisionForm})
      expect(getDecisionDetailOptionsSelector(state)).toEqualImmutable(List())
    })
  })

  describe('getAdditionalInformationSelector', () => {
    it('returns the proper value if one exists', () => {
      const screeningDecisionForm = {additional_information: {value: 'ABC'}}
      const state = fromJS({screeningDecisionForm})
      expect(getAdditionalInformationSelector(state).get('value')).toEqual('ABC')
    })

    it('returns an empty string if current value is null', () => {
      const screeningDecisionForm = {additional_information: {value: null}}
      const state = fromJS({screeningDecisionForm})
      expect(getAdditionalInformationSelector(state).get('value')).toEqual('')
    })
  })

  describe('getAccessRestrictionSelector', () => {
    it('returns the proper value if one exists', () => {
      const screeningDecisionForm = {access_restrictions: {value: 'ABC'}}
      const state = fromJS({screeningDecisionForm})
      expect(getAccessRestrictionSelector(state).get('value')).toEqual('ABC')
    })

    it('returns an empty string if current value is null', () => {
      const screeningDecisionForm = {access_restrictions: {value: null}}
      const state = fromJS({screeningDecisionForm})
      expect(getAccessRestrictionSelector(state).get('value')).toEqual('')
    })
  })

  describe('getRestrictionRationaleSelector', () => {
    it('returns the proper value if one exists', () => {
      const screeningDecisionForm = {restrictions_rationale: {value: 'ABC'}}
      const state = fromJS({screeningDecisionForm})
      expect(getRestrictionRationaleSelector(state).get('value')).toEqual('ABC')
    })

    it('returns an empty string if current value is null', () => {
      const screeningDecisionForm = {restrictions_rationale: {value: null}}
      const state = fromJS({screeningDecisionForm})
      expect(getRestrictionRationaleSelector(state).get('value')).toEqual('')
    })
  })

  describe('getScreeningWithEditsSelector', () => {
    it('replaces current saved screening values with form values', () => {
      const screening = {
        screening_decision: 'ABC',
        screening_decision_detail: 'DEF',
        screening_contact_reference: 'REF',
        additional_information: 'GHI',
        access_restrictions: 'JKL',
        restrictions_rationale: 'MNO',
        narrative: 'Hello',
      }
      const screeningDecisionForm = {
        screening_decision: {value: '1'},
        screening_decision_detail: {value: '2'},
        screening_contact_reference: {value: 'REF'},
        additional_information: {value: '3'},
        access_restrictions: {value: '4'},
        restrictions_rationale: {value: '5'},
      }
      const state = fromJS({screening, screeningDecisionForm})
      expect(getScreeningWithEditsSelector(state)).toEqualImmutable(fromJS({
        screening_decision: '1',
        screening_decision_detail: '2',
        screening_contact_reference: 'REF',
        additional_information: '3',
        access_restrictions: '4',
        restrictions_rationale: '5',
        narrative: 'Hello',
        participants: [],
      }))
    })

    it('takes the participants from the participants list', () => {
      const screening = {
        screening_decision: 'ABC',
        screening_decision_detail: 'DEF',
        screening_contact_reference: 'REF',
        additional_information: 'GHI',
        access_restrictions: 'JKL',
        restrictions_rationale: 'MNO',
        narrative: 'Hello',
        participants: [{id: '456', first_name: 'Luigi'}],
      }
      const screeningDecisionForm = {
        screening_decision: {value: '1'},
        screening_decision_detail: {value: '2'},
        screening_contact_reference: {value: 'REF'},
        additional_information: {value: '3'},
        access_restrictions: {value: '4'},
        restrictions_rationale: {value: '5'},
      }
      const participants = [{id: '123', first_name: 'Mario', addresses: []}]
      const state = fromJS({screening, screeningDecisionForm, participants})
      expect(getScreeningWithEditsSelector(state)).toEqualImmutable(fromJS({
        screening_decision: '1',
        screening_decision_detail: '2',
        screening_contact_reference: 'REF',
        additional_information: '3',
        access_restrictions: '4',
        restrictions_rationale: '5',
        narrative: 'Hello',
        participants,
      }))
    })

    it('converts addresses to the format Ferb expects', () => {
      const screening = {
        screening_decision: 'ABC',
        screening_decision_detail: 'DEF',
        screening_contact_reference: 'REF',
        additional_information: 'GHI',
        access_restrictions: 'JKL',
        restrictions_rationale: 'MNO',
        narrative: 'Hello',
        participants: [{id: '456', first_name: 'Luigi'}],
      }
      const screeningDecisionForm = {
        screening_decision: {value: '1'},
        screening_decision_detail: {value: '2'},
        screening_contact_reference: {value: 'REF'},
        additional_information: {value: '3'},
        access_restrictions: {value: '4'},
        restrictions_rationale: {value: '5'},
      }
      const participants = [{
        id: '1',
        first_name: 'Mario',
        addresses: [{
          id: '1',
          street: '1000 Peach Castle',
          city: 'World 1-1',
          state: 'Mushroom Kingdom',
          zip: '00001',
          type: 'Home',
          legacy_descriptor: {legacy_id: 'ABC123'},
        }],
      }]
      const state = fromJS({screening, screeningDecisionForm, participants})
      expect(getScreeningWithEditsSelector(state)).toEqualImmutable(fromJS({
        screening_decision: '1',
        screening_decision_detail: '2',
        screening_contact_reference: 'REF',
        additional_information: '3',
        access_restrictions: '4',
        restrictions_rationale: '5',
        narrative: 'Hello',
        participants: [{
          id: '1',
          first_name: 'Mario',
          addresses: [{
            id: '1',
            street_address: '1000 Peach Castle',
            city: 'World 1-1',
            state: 'Mushroom Kingdom',
            zip: '00001',
            type: 'Home',
            legacy_descriptor: {legacy_id: 'ABC123'},
          }],
        }],
      }))
    })
  })

  describe('getErrorsSelector', () => {
    describe('screening decision', () => {
      it('includes an error message if screening decision is empty', () => {
        const screeningDecisionForm = {}
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['Please enter a decision']))
      })

      it('does not include an error message if screening decision is present', () => {
        const screeningDecisionForm = {screening_decision: {value: 'screen_out'}}
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })

      it('includes an error message if decision is information to child welfare service and role is empty', () => {
        const screeningDecisionForm = {screening_decision: {value: 'information_to_child_welfare_services'}}
        const participants = [{id: '1', roles: []}]
        const state = fromJS({screeningDecisionForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['A reporter is required to submit a screening Contact']))
      })

      it('includes an error message if decision is information to child welfare service and role is not reporter', () => {
        const screeningDecisionForm = {screening_decision: {value: 'information_to_child_welfare_services'}}
        const participants = [{id: '1', roles: ['Victim', 'Perpetrator']}]
        const state = fromJS({screeningDecisionForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['A reporter is required to submit a screening Contact']))
      })

      it('does not include an error message if decision is information to child welfare service and role is reporter', () => {
        const screeningDecisionForm = {screening_decision: {value: 'information_to_child_welfare_services'}}
        const participants = [{id: '1', roles: ['Mandated Reporter', 'Victim']}]
        const state = fromJS({screeningDecisionForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })

      it('includes an error message if decision is promote to referral and allegations are empty', () => {
        const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
        const allegationsForm = [{allegationTypes: []}]
        const participants = [{roles: ['Mandated Reporter']}]
        const state = fromJS({screeningDecisionForm, allegationsForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['Please enter at least one allegation to promote to referral.']))
      })

      it('includes an error message if decision is promote to referral and there is no reporter', () => {
        const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
        const allegationsForm = [{allegationTypes: ['General neglect']}]
        const participants = [{roles: ['Victim']}]
        const state = fromJS({screeningDecisionForm, allegationsForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List(['A reporter is required to promote to referral']))
      })

      it('does not include an error message if decision is promote to referral and allegations and reporter are present', () => {
        const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
        const allegationsForm = [{allegationTypes: ['General neglect']}]
        const participants = [{roles: ['Mandated Reporter']}]
        const state = fromJS({screeningDecisionForm, allegationsForm, participants})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })

      it('includes an error message if decision is not promote to referral, even if allegations are empty', () => {
        const screeningDecisionForm = {screening_decision: {value: 'screen_out'}}
        const allegationsForm = [{allegationTypes: []}]
        const state = fromJS({screeningDecisionForm, allegationsForm})
        expect(getErrorsSelector(state).get('screening_decision'))
          .toEqualImmutable(List())
      })
    })

    describe('screening decision detail', () => {
      it('includes an error message if decision is promote to referral and no detail is present', () => {
        const screeningDecisionForm = {screening_decision: {value: 'promote_to_referral'}}
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('screening_decision_detail'))
          .toEqualImmutable(List(['Please enter a response time']))
      })

      it('does not include an error message if decision is promote to referral and detail is present', () => {
        const screeningDecisionForm = {
          screening_decision: {value: 'promote_to_referral'},
          screening_decision_detail: {value: '3_days'},
        }
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('screening_decision_detail'))
          .toEqualImmutable(List())
      })

      it('does not include an error message if decision is not promote to referral, even when detail is empty', () => {
        const screeningDecisionForm = {screening_decision: {value: 'screen_out'}}
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('screening_decision_detail'))
          .toEqualImmutable(List())
      })
    })

    describe('additional information', () => {
      it('includes an error message if decision is screen out and decision detail is evaluate out', () => {
        const screeningDecisionForm = {
          screening_decision: {value: 'screen_out'},
          screening_decision_detail: {value: 'evaluate_out'},
        }
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List(['Please enter additional information']))
      })

      it('does not include an error message if decision is screen out and decision detail is anything other than evaluate out', () => {
        const screeningDecisionForm = {
          screening_decision: {value: 'screen_out'},
          screening_decision_detail: {value: 'not evaluate_out'},
        }
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List())
      })

      it('does not include an error message if decision is screen out, and decision detail is empty', () => {
        const screeningDecisionForm = {screening_decision: {value: 'screen_out'}}
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List())
      })

      it('does not include an error message if decision is not screen out', () => {
        const screeningDecisionForm = {screening_decision: 'not screen_out'}
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('additional_information'))
          .toEqualImmutable(List())
      })
    })

    describe('restrictions rationale', () => {
      it('includes an error message if restrictions rationale is empty', () => {
        const screeningDecisionForm = { }
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('restrictions_rationale'))
          .toEqualImmutable(List(['Please enter an access restriction reason'])
          )
      })

      it('excludes an error message if restrictions rationale is not empty', () => {
        const screeningDecisionForm = {
          restrictions_rationale: {
            value: 'a rationale',
          },
        }
        const state = fromJS({screeningDecisionForm})
        expect(getErrorsSelector(state).get('restrictions_rationale'))
          .toEqualImmutable(List([])
          )
      })
    })
  })

  describe('getVisibleErrorsSelector', () => {
    it('returns an error if the field has a validation and is touched', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'promote_to_referral', touched: true},
        screening_decision_detail: {value: '', touched: true},
      }
      const allegationsForm = [{allegationTypes: []}]
      const state = fromJS({screeningDecisionForm, allegationsForm})
      const errors = getVisibleErrorsSelector(state)
      expect(errors.get('screening_decision'))
        .toEqualImmutable(List([
          'Please enter at least one allegation to promote to referral.',
          'A reporter is required to promote to referral',
        ]))
      expect(errors.get('screening_decision_detail'))
        .toEqualImmutable(List(['Please enter a response time']))
    })

    it('does not return an error if the field has not been touched', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'promote_to_referral', touched: false},
        screening_decision_detail: {value: '', touched: false},
      }
      const allegationsForm = [{allegationTypes: []}]
      const state = fromJS({screeningDecisionForm, allegationsForm})
      const errors = getVisibleErrorsSelector(state)
      expect(errors.every((fieldErrors) => fieldErrors.isEmpty())).toEqual(true)
    })
  })

  describe('getDecisionAlertErrorMessageSelector', () => {
    it('returns a message when no allegations should be present but allegation is included', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'information_to_child_welfare_services'},
        screening_decision_detail: {value: ''},
      }
      const allegationsForm = [{
        id: 1,
        victimId: '123abc',
        perpetratorId: 'cba321',
        allegationTypes: ['Physical abuse'],
      }]
      const state = fromJS({screeningDecisionForm, allegationsForm})
      expect(getDecisionAlertErrorMessageSelector(state)).toContain('Please remove any allegations before submitting this information to a social worker on an existing case or referral.')
    })

    it('does not return an error when no allegations are present ', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'information_to_child_welfare_services'},
        screening_decision_detail: {value: ''},
      }
      const allegationsForm = [{allegationTypes: []}]
      const state = fromJS({screeningDecisionForm, allegationsForm})
      expect(getDecisionAlertErrorMessageSelector(state)).toEqual(undefined)
    })

    it('does not return an error when allegations are allowed ', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'promote_to_referral'},
        screening_decision_detail: {value: ''},
      }
      const allegationsForm = [{
        id: 1,
        victimId: '123abc',
        perpetratorId: 'cba321',
        allegationTypes: ['Physical abuse'],
      }]
      const state = fromJS({screeningDecisionForm, allegationsForm})
      expect(getDecisionAlertErrorMessageSelector(state)).toEqual(undefined)
    })
  })

  describe('selectContactReference', () => {
    it('selectContactReferenceValue returns a value', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'information_to_child_welfare_services'},
        screening_decision_detail: {value: ''},
        screening_contact_reference: {value: '1111-1111'},
      }
      const state = fromJS({screeningDecisionForm})
      expect(selectContactReferenceValue(state)).toEqual('1111-1111')
    })

    it('selectContactReferenceField returns a map with field data', () => {
      const screeningDecisionForm = {
        screening_decision: {value: 'information_to_child_welfare_services'},
        screening_contact_reference: {value: '1111-1111'},
      }
      const state = fromJS({screeningDecisionForm})
      expect(selectContactReference(state)).toEqualImmutable(Map({required: true, value: '1111-1111', errors: List()}))
    })
    describe('validations', () => {
      it('an error is returned if the field contains an valid case or referal id but the item is closed', () => {
        const screeningDecisionForm = {
          screening_decision: {value: 'information_to_child_welfare_services'},
          screening_contact_reference: {value: '0442-2654-1834-4001650', touched: true},
        }
        const involvements = {
          referrals: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
            legacy_descriptor: {
              legacy_ui_id: '0442-2654-1834-4001650',
            },
          }],
          cases: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
          }],
        }
        const state = fromJS({screeningDecisionForm, involvements})
        expect(selectContactReference(state)).toEqualImmutable(Map({required: true, value: '0442-2654-1834-4001650', errors: List(['Please enter a valid Case or Referral Id'])}))
      })

      it('no error is returned if the field contains an valid case or referal id', () => {
        const screeningDecisionForm = {
          screening_decision: {value: 'information_to_child_welfare_services'},
          screening_contact_reference: {value: '0442-2654-1834-4001650', touched: true},
        }
        const involvements = {
          referrals: [{
            start_date: '01/01/2014',
            legacy_descriptor: {
              legacy_ui_id: '0442-2654-1834-4001650',
            },
          }],
          cases: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
          }, {
            start_date: '01/01/2014',
            legacy_descriptor: {
              legacy_ui_id: '3333-2232-1111-2233120',
            },
          }],
        }
        const state = fromJS({screeningDecisionForm, involvements})
        expect(selectContactReference(state)).toEqualImmutable(Map({required: true, value: '0442-2654-1834-4001650', errors: List()}))
      })

      it('an error is returned if the field contains an invalid case or referal id', () => {
        const screeningDecisionForm = {
          screening_decision: {value: 'information_to_child_welfare_services'},
          screening_contact_reference: {value: '', touched: true},
        }
        const involvements = {
          referrals: [{
            start_date: '01/01/2014',
            legacy_descriptor: {
              legacy_ui_id: '0442-2654-1834-4001650',
            },
          }],
          cases: [{
            start_date: '01/01/2014',
            end_date: '02/02/2014',
          }],
        }
        const state = fromJS({screeningDecisionForm, involvements})
        expect(selectContactReference(state)).toEqualImmutable(Map({required: true, value: '', errors: List(['Please enter a valid Case or Referral Id'])}))
      })
    })
  })
})
