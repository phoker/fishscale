import React, { useState } from 'react'
import styled from 'styled-components'
import Scale from '../index'

const ExampleContainer = styled.div`
  width: 100%;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: yellow;
`

const Example = () => {
  const [ value, setValue ] = useState(0)
  const onChange = percentage => { setValue(percentage) }
  return (
    <>
      <ExampleContainer>
        <Scale
          value={value}
          onChange={onChange}
        />
      </ExampleContainer>
      {value}
    </>
  )
}

export default {
  component: Example
}
