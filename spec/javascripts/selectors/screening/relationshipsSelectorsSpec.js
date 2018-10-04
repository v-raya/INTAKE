import {fromJS} from 'immutable'
import {
  getPeopleSelector,
} from 'selectors/screening/relationshipsSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('relationshipsSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const emptyState = fromJS({relationships: []})

  describe('getPeopleSelector', () => {
    it('returns a list of people or an empty list if there are no people', () => {
      const relationships = [
        {
          age: 20,
          age_unit: 'Y',
          date_of_birth: '1986-01-15',
          estimated_dob_code: 'N',
          first_name: 'Ricky',
          gender: 'M',
          id: '805',
          last_name: 'Robinson',
          legacy_id: '10',
        },
        {
          age: 30,
          age_unit: 'Y',
          date_of_birth: '1990-03-15',
          estimated_dob_code: 'N',
          first_name: 'Johny',
          gender: 'M',
          id: '808',
          last_name: 'Robinson',
          legacy_id: '20',
        },
        {
          age: 40,
          age_unit: 'Y',
          estimated_date_of_birth: '1982-01-01',
          estimated_dob_code: 'Y',
          first_name: 'Will',
          gender: 'M',
          id: '405',
          last_name: 'Carlson',
          legacy_id: '30',
        },
      ]
      const state = fromJS({relationships})
      expect(getPeopleSelector(state)).toEqualImmutable(fromJS([
        {
          age: '20 yrs',
          dateOfBirth: '01/15/1986',
          estimated_date_of_birth: '',
          estimatedDobCode: 'N',
          gender: 'Male',
          gender_code: 'M',
          id: '805',
          legacy_id: '10',
          name: 'Ricky Robinson',
          relationships: [],
        },
        {
          age: '30 yrs',
          dateOfBirth: '03/15/1990',
          estimated_date_of_birth: '',
          estimatedDobCode: 'N',
          gender: 'Male',
          gender_code: 'M',
          id: '808',
          legacy_id: '20',
          name: 'Johny Robinson',
          relationships: [],
        },
        {
          age: '40 yrs',
          dateOfBirth: '',
          estimated_date_of_birth: '01/01/1982',
          estimatedDobCode: 'Y',
          gender: 'Male',
          gender_code: 'M',
          id: '405',
          legacy_id: '30',
          name: 'Will Carlson',
          relationships: [],
        },
      ]))
      expect(getPeopleSelector(emptyState)).toEqualImmutable(fromJS([]))
    })

    it('returns a list of people with an empty gender', () => {
      const relationships = [
        {
          legacy_id: '10',
          first_name: 'Ricky',
          last_name: 'Robinson',
          gender: '',
          estimated_dob_code: 'N',
          date_of_birth: '1986-01-15',
          age: 20,
          age_unit: 'Y',
          id: '808',
        },
      ]
      const state = fromJS({relationships})
      expect(getPeopleSelector(state)).toEqualImmutable(fromJS(
        [{
          id: '808',
          dateOfBirth: '01/15/1986',
          estimated_date_of_birth: '',
          estimatedDobCode: 'N',
          legacy_id: '10',
          name: 'Ricky Robinson',
          relationships: [],
          gender: '',
          gender_code: '',
          age: '20 yrs',
        }]
      ))
    })

    it('returns a list of relationships for each person', () => {
      const participants = [
        {
          first_name: 'Ricky',
          last_name: 'Robinson',
          legacy_id: '3',
        },
        {
          first_name: 'Johny',
          last_name: 'Robinson',
          legacy_id: '2',
        },
      ]
      const relationships = [
        {
          date_of_birth: '1986-01-15',
          estimated_dob_code: 'N',
          first_name: 'Ricky',
          gender: 'M',
          id: '23',
          last_name: 'Robinson',
          legacy_id: '3',
          age: 20,
          age_unit: 'Y',
          relationships: [
            {
              absent_parent_code: 'Y',
              relationship_id: '415',
              related_person_id: '3970',
              estimated_date_of_birth: '1990-01-01',
              estimated_dob_code: 'Y',
              related_person_gender: 'M',
              related_person_sealed: true,
              related_person_sensitive: false,
              related_person_first_name: 'Johny',
              related_person_last_name: 'Robinson',
              related_person_relationship: '17',
              indexed_person_relationship: '17',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '2',
              },
              reversed: false,
              same_home_code: 'Y',
            },
            {
              absent_parent_code: 'N',
              relationship_id: '808',
              related_person_id: '650',
              estimated_dob_code: 'U',
              related_person_gender: 'M',
              related_person_sealed: false,
              related_person_sensitive: false,
              related_person_first_name: 'Will',
              related_person_last_name: 'Carlson',
              related_person_relationship: '297',
              indexed_person_relationship: '258',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '1',
              },
              reversed: false,
              same_home_code: 'N',
            },
          ],
        },
        {
          first_name: 'Johny',
          gender: 'M',
          id: '805',
          last_name: 'Robinson',
          legacy_id: '2',
          date_of_birth: '1990-03-15',
          estimated_dob_code: 'N',
          age: 20,
          age_unit: 'Y',
          relationships: [
            {
              absent_parent_code: 'Y',
              relationship_id: '801',
              related_person_id: '910',
              estimated_date_of_birth: '1986-01-01',
              estimated_dob_code: 'Y',
              related_person_gender: 'M',
              related_person_sealed: false,
              related_person_sensitive: false,
              related_person_first_name: 'Ricky',
              related_person_last_name: 'Robinson',
              related_person_relationship: '17',
              indexed_person_relationship: '17',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '3',
              },
              reversed: false,
              same_home_code: 'Y',
            },
            {
              absent_parent_code: 'N',
              relationship_id: '802',
              related_person_id: '650',
              estimated_dob_code: 'U',
              related_person_gender: 'M',
              related_person_sealed: false,
              related_person_sensitive: false,
              related_person_first_name: 'Will',
              related_person_last_name: 'Carlson',
              related_person_relationship: '297',
              indexed_person_relationship: '258',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '1',
              },
              reversed: false,
              same_home_code: 'N',
            },
          ],
        },
      ]

      const relationshipTypes = [
        {code: '17', value: 'Brother'},
        {code: '258', value: 'Nephew (Paternal)'},
        {code: '297', value: 'Uncle (Paternal)'},
      ]
      const state = fromJS({relationships, systemCodes: {relationshipTypes}, participants})

      expect(getPeopleSelector(state)).toEqualImmutable(fromJS([
        {
          dateOfBirth: '01/15/1986',
          estimated_date_of_birth: '',
          estimatedDobCode: 'N',
          legacy_id: '3',
          name: 'Ricky Robinson',
          gender: 'Male',
          gender_code: 'M',
          id: '23',
          age: '20 yrs',
          relationships: [
            {
              absent_parent_code: 'Y',
              dateOfBirth: '',
              estimated_date_of_birth: '01/01/1990',
              estimatedDobCode: 'Y',
              gender: 'Male',
              gender_code: 'M',
              isSealed: true,
              isSensitive: false,
              name: 'Johny Robinson',
              legacy_descriptor: {legacy_id: '2'},
              type: 'Brother',
              relationshipId: '415',
              relativeId: '3970',
              secondaryRelationship: 'Brother',
              person_card_exists: false,
              reversed: false,
              same_home_code: 'Y',
              type_code: '17',
              age: '30 yrs',
            },
            {
              absent_parent_code: 'N',
              dateOfBirth: '',
              estimated_date_of_birth: '',
              estimatedDobCode: 'U',
              gender: 'Male',
              gender_code: 'M',
              isSealed: false,
              isSensitive: false,
              name: 'Will Carlson',
              legacy_descriptor: {legacy_id: '1'},
              type: 'Nephew (Paternal)',
              relationshipId: '808',
              relativeId: '650',
              secondaryRelationship: 'Uncle (Paternal)',
              person_card_exists: true,
              reversed: false,
              same_home_code: 'N',
              type_code: '258',
              age: '30 yrs',
            },
          ],
        },
        {
          estimated_date_of_birth: '',
          dateOfBirth: '03/15/1990',
          estimatedDobCode: 'N',
          legacy_id: '2',
          name: 'Johny Robinson',
          id: '805',
          gender: 'Male',
          gender_code: 'M',
          age: '20 yrs',
          relationships: [
            {
              absent_parent_code: 'Y',
              dateOfBirth: '',
              estimated_date_of_birth: '01/01/1986',
              estimatedDobCode: 'Y',
              gender: 'Male',
              isSealed: false,
              isSensitive: false,
              gender_code: 'M',
              name: 'Ricky Robinson',
              legacy_descriptor: {legacy_id: '3'},
              type: 'Brother',
              relationshipId: '801',
              relativeId: '910',
              secondaryRelationship: 'Brother',
              person_card_exists: false,
              reversed: false,
              same_home_code: 'Y',
              type_code: '17',
              age: '30 yrs',
            },
            {
              absent_parent_code: 'N',
              dateOfBirth: '',
              estimated_date_of_birth: '',
              estimatedDobCode: 'U',
              gender: 'Male',
              isSealed: false,
              isSensitive: false,
              gender_code: 'M',
              name: 'Will Carlson',
              legacy_descriptor: {legacy_id: '1'},
              type: 'Nephew (Paternal)',
              relationshipId: '802',
              relativeId: '650',
              secondaryRelationship: 'Uncle (Paternal)',
              person_card_exists: true,
              reversed: false,
              same_home_code: 'N',
              type_code: '258',
              age: '30 yrs',
            },
          ],
        },
      ]))
    })
  })

  describe('Maps different gender keys', () => {
    it('Displays gender as Female if the data is female', () => {
      const relationships = [{
        id: '808',
        legacy_id: '10',
        first_name: 'Android',
        last_name: '18',
        gender: 'female',
        date_of_birth: '1986-01-15',
        estimated_dob_code: 'N',
        age: 18,
        age_unit: 'Y',
      }]
      const state = fromJS({relationships})
      expect(getPeopleSelector(state)).toEqualImmutable(fromJS([{
        id: '808',
        dateOfBirth: '01/15/1986',
        estimated_date_of_birth: '',
        estimatedDobCode: 'N',
        legacy_id: '10',
        name: 'Android 18',
        relationships: [],
        gender: 'Female',
        gender_code: 'F',
        age: '18 yrs',
      }]))
    })

    it('Displays gender as Unknown if the data is u', () => {
      const relationships = [{
        id: '808',
        legacy_id: '10',
        first_name: 'Android',
        last_name: '18',
        gender: 'F',
        gender_code: 'F',
        date_of_birth: '1986-01-15',
        estimated_dob_code: 'N',
        age: 18,
        age_unit: 'Y',
        relationships: [{
          absent_parent_code: 'Y',
          relationship_id: '415',
          related_person_id: '3970',
          estimated_date_of_birth: '1990-01-01',
          estimated_dob_code: 'Y',
          related_person_gender: 'U',
          related_person_sealed: false,
          related_person_sensitive: true,
          related_person_first_name: 'Cell',
          related_person_last_name: 'Android',
          related_person_relationship: '17',
          indexed_person_relationship: '17',
          related_person_age: 30,
          related_person_age_unit: 'Y',
          legacy_descriptor: {legacy_id: '2'},
          reversed: false,
          same_home_code: 'Y',
        }],
      }]
      const relationshipTypes = [{code: '17', value: 'Brother'}]
      const state = fromJS({relationships, systemCodes: {relationshipTypes}})
      expect(getPeopleSelector(state)).toEqualImmutable(fromJS([{
        id: '808',
        dateOfBirth: '01/15/1986',
        estimated_date_of_birth: '',
        estimatedDobCode: 'N',
        legacy_id: '10',
        name: 'Android 18',
        gender: 'Female',
        gender_code: 'F',
        age: '18 yrs',
        relationships: [{
          absent_parent_code: 'Y',
          dateOfBirth: '',
          estimated_date_of_birth: '01/01/1990',
          estimatedDobCode: 'Y',
          gender: 'Unknown',
          gender_code: 'U',
          isSealed: false,
          isSensitive: true,
          name: 'Cell Android',
          legacy_descriptor: {legacy_id: '2'},
          type: 'Brother',
          person_card_exists: true,
          relationshipId: '415',
          relativeId: '3970',
          secondaryRelationship: 'Brother',
          reversed: false,
          same_home_code: 'Y',
          type_code: '17',
          age: '30 yrs',
        }],
      }]))
    })
  })
})

