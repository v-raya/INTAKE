import SafelySurrenderedBabyForm from 'views/people/SafelySurrenderedBabyForm'
import React from 'react'
import {shallow} from 'enzyme'

describe('SafeleySurrenderedBabyForm', () => {
  const render = (props) => shallow(<SafelySurrenderedBabyForm {...props}/>)

  let root

  beforeEach(() => {
    root = render({
      surrenderedBy: 'Hagrid',
      relationToChild: 'Groundskeeper',
      braceletId: 'Lightning',
      parentGuardGivenBraceletId: true,
      parentGuardProvMedicalQuestionaire: false,
      comments: 'Yer a wizard, Harry!',
      medQuestionaireReturnDate: '2001-11-14',
    })
  })

  it('renders a grouping header', () => {
    const header = root.find('GrouperHeading')
    expect(header.props().text).toEqual('Safely Surrendered Baby Information')
  })
})
