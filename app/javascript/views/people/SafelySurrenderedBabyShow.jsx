import React from 'react'
import ShowField from 'common/ShowField'

const SafelySurrenderedBabyShow = () => (
  <div>
    <div>hello</div>
    <ShowField
      errors={[]}
      required={true}
      label='Name'
    >
      Foo!
    </ShowField>
  </div>
)

export default SafelySurrenderedBabyShow
