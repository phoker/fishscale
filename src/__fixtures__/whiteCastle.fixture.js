import React, { useState } from 'react'
import styled from 'styled-components'
import Scale from '../index'

const ExampleContainer = styled.div`
  width: 100%;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background: #00FFA2;
`

const CurrentValue = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-family: sans-serif;
  color: #004466;
  font-size: 25vh;
`

const Example = () => {
  const [ value, setValue ] = useState(0)
  const onChange = percentage => { setValue(percentage) }
  return (
    <>
      <ExampleContainer>
        <CurrentValue>
          {value}
        </CurrentValue>
        <Scale
          value={value}
          onChange={onChange}
          color='#004466'
        />
      </ExampleContainer>
    </>
  )
}

export default {
  component: Example
}
