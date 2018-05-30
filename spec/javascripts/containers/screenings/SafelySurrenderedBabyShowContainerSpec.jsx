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
        surrendered_by: 'Hagrid',
        relation_to_child: 'Groundskeeper',
        bracelet_id: 'Lightning',
        parent_guardian_given_bracelet_id: 'Attempted',
        parent_guardian_provided_med_questionaire: 'Declined',
        comments: 'Yer a wizard, Harry!',
        med_questionaire_return_date: '2001-11-14',
      },
      reportType: 'ssb',
    })

    expect(root.find('SafelySurrenderedBabyShow').exists()).toEqual(true)
  })

  it('renders nothing when there is no SSB information', () => {
    const root = render({
      safelySurrenderedBaby: null,
      reportType: 'ssb',
    })

    expect(root.find('SafelySurrenderedBabyShow').exists()).toEqual(false)
    expect(root.type()).toEqual(null)
  })

  it('renders nothing when the report type is not SSB', () => {
    const root = render({
      safelySurrenderedBaby: {
        surrendered_by: 'Hagrid',
        relation_to_child: 'Groundskeeper',
        bracelet_id: 'Lightning',
        parent_guardian_given_bracelet_id: 'Attempted',
        parent_guardian_provided_med_questionaire: 'Declined',
        comments: 'Yer a wizard, Harry!',
        med_questionaire_return_date: '2001-11-14',
      },
      reportType: 'csec',
    })

    expect(root.find('SafelySurrenderedBabyShow').exists()).toEqual(false)
    expect(root.type()).toEqual(null)
  })

  describe('mapStateToProps', () => {
    const state = fromJS({
      screening: {report_type: 'ssb'},
      safelySurrenderedBaby: {
        persisted: {
          participant_child: '123',
          surrendered_by: null,
          relation_to_child: '1600',
          bracelet_id: 'Lightning',
          parent_guardian_given_bracelet_id: 'A',
          parent_guardian_provided_med_questionaire: 'D',
          comments: 'Yer a wizard, Harry!',
          med_questionaire_return_date: '2001-11-14',
        },
      },
    })

    it('results in props when the person is a safely surrendered baby', () => {
      const ownProps = {personId: '123'}

      expect(mapStateToProps(state, ownProps)).toEqual({
        reportType: 'ssb',
        safelySurrenderedBaby: {
          participant_child: '123',
          surrendered_by: 'Unknown',
          relation_to_child: 'Brother',
          bracelet_id: 'Lightning',
          parent_guardian_given_bracelet_id: 'Attempted',
          parent_guardian_provided_med_questionaire: 'Declined',
          comments: 'Yer a wizard, Harry!',
          med_questionaire_return_date: '2001-11-14',
        },
      })
    })

    it('results in nothing when the person is not a match', () => {
      const ownProps = {personId: '456'}

      expect(mapStateToProps(state, ownProps)).toEqual({
        reportType: 'ssb',
        safelySurrenderedBaby: null,
      })
    })
  })
})
