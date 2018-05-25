import {fromJS} from 'immutable'
import React from 'react'
import {shallow} from 'enzyme'
import {
  SafelySurrenderedBabyShowContainer,
  mapStateToProps,
} from 'containers/screenings/SafelySurrenderedBabyShowContainer'

describe('SafelySurrenderedBabyShowContainer', () => {
  const render = (props) => shallow(<SafelySurrenderedBabyShowContainer {...props}/>)

  it('renders a SafelySurrenderedBabyShow when given props', () => {
    const root = render({
      safelySurrenderedBaby: {
        surrenderedBy: 'Hagrid',
        relationToChild: 'Groundskeeper',
        braceletId: 'Lightning',
        parentGuardGivenBraceletId: 'Attempted',
        parentGuardProvMedicalQuestionaire: 'Declined',
        comments: 'Yer a wizard, Harry!',
        medQuestionaireReturnDate: '2001-11-14',
      },
    })

    expect(root.find('SafelySurrenderedBabyShow').exists()).toEqual(true)
  })

  it('renders nothing when there is no SSB information', () => {
    const root = render({
      safelySurrenderedBaby: null,
    })

    expect(root.find('SafelySurrenderedBabyShow').exists()).toEqual(false)
    expect(root.type()).toEqual(null)
  })

  describe('mapStateToProps', () => {
    const state = fromJS({
      safelySurrenderedBaby: {
        persisted: {
          participantChildId: '123',
          surrenderedBy: 'Hagrid',
          relationToChild: '1600',
          braceletId: 'Lightning',
          parentGuardGivenBraceletId: 'attempted',
          parentGuardProvMedicalQuestionaire: 'declined',
          comments: 'Yer a wizard, Harry!',
          medQuestionaireReturnDate: '2001-11-14',
        },
      },
    })

    it('results in props when the person is a safely surrendered baby', () => {
      const ownProps = {personId: '123'}

      expect(mapStateToProps(state, ownProps)).toEqual({
        safelySurrenderedBaby: {
          participantChildId: '123',
          surrenderedBy: 'Hagrid',
          relationToChild: 'Brother',
          braceletId: 'Lightning',
          parentGuardGivenBraceletId: 'Attempted',
          parentGuardProvMedicalQuestionaire: 'Declined',
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
})
