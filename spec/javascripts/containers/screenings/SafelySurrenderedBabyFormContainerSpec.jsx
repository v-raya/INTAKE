import {fromJS} from 'immutable'
import React from 'react'
import {shallow} from 'enzyme'
import {
  SafelySurrenderedBabyFormContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'containers/screenings/SafelySurrenderedBabyFormContainer'

describe('SafelySurrenderedBabyFormContainer', () => {
  const render = (props) => shallow(<SafelySurrenderedBabyFormContainer {...props}/>)

  it('renders a SafelySurrenderedBabyForm when given props', () => {
    const root = render({
      safelySurrenderedBaby: {
        surrenderedBy: 'Hagrid',
        relationToChild: 'Groundskeeper',
        braceletId: 'Lightning',
        parentGuardGivenBraceletId: 'yes',
        parentGuardProvMedicalQuestionaire: 'no',
        comments: 'Yer a wizard, Harry!',
        medQuestionaireReturnDate: '2001-11-14',
      },
      actions: jasmine.createSpyObj('actions', ['onChange', 'onBlur']),
    })

    expect(root.find('SafelySurrenderedBabyForm').exists()).toEqual(true)
  })

  it('renders nothing when there is no SSB information', () => {
    const root = render({
      safelySurrenderedBaby: null,
      actions: jasmine.createSpyObj('actions', ['onChange', 'onBlur']),
    })

    expect(root.find('SafelySurrenderedBabyForm').exists()).toEqual(false)
    expect(root.type()).toEqual(null)
  })

  describe('mapStateToProps', () => {
    const state = fromJS({
      safelySurrenderedBaby: {
        participant_child_id: '123',
        surrenderedBy: 'Hagrid',
        relationToChild: 'Groundskeeper',
        braceletId: 'Lightning',
        parentGuardGivenBraceletId: 'yes',
        parentGuardProvMedicalQuestionaire: 'no',
        comments: 'Yer a wizard, Harry!',
        medQuestionaireReturnDate: '2001-11-14',
      },
    })

    it('results in props when the person is a safely surrendered baby', () => {
      const ownProps = {personId: '123'}

      expect(mapStateToProps(state, ownProps)).toEqual({
        safelySurrenderedBaby: {
          participant_child_id: '123',
          surrenderedBy: 'Hagrid',
          relationToChild: 'Groundskeeper',
          braceletId: 'Lightning',
          parentGuardGivenBraceletId: 'yes',
          parentGuardProvMedicalQuestionaire: 'no',
          comments: 'Yer a wizard, Harry!',
          medQuestionaireReturnDate: '2001-11-14',
        },
      })
    })

    it('results in nothing when the person is not a match', () => {
      const ownProps = {personId: '456'}

      expect(mapStateToProps(state, ownProps)).toEqual({
        safelySurrenderedBaby: null,
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('saves the surrenderedBy field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('surrenderedBy', 'New SB')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'surrenderedBy',
          value: 'New SB',
        },
      })
    })
    it('saves the relationToChild field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('relationToChild', 'New Relation')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'relationToChild',
          value: 'New Relation',
        },
      })
    })
    it('saves the braceletId field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('braceletId', 'New Bracelet')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'braceletId',
          value: 'New Bracelet',
        },
      })
    })
    it('saves the comments field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('comments', 'New Comments')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'comments',
          value: 'New Comments',
        },
      })
    })
    it('saves the parentGuardGivenBraceletId field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('parentGuardGivenBraceletId', 'Could Be')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'parentGuardGivenBraceletId',
          value: 'Could Be',
        },
      })
    })
    it('saves the parentGuardProvMedicalQuestionaire field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('parentGuardProvMedicalQuestionaire', 'Yessir')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'parentGuardProvMedicalQuestionaire',
          value: 'Yessir',
        },
      })
    })
    it('saves the medQuestionaireReturnDate field on change', () => {
      const dispatch = jasmine.createSpy('dispatch')
      const actions = mapDispatchToProps(dispatch).actions

      actions.onChange('medQuestionaireReturnDate', '2010-01-02')

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_SSB_FIELD',
        payload: {
          field: 'medQuestionaireReturnDate',
          value: '2010-01-02',
        },
      })
    })
  })
})
