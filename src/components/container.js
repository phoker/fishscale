import styled from 'styled-components'
import { transparentize } from 'polished'

const InputContainer = styled.div`
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: ${({ color }) => transparentize(0.75, color)};
  position: relative;
`

export default InputContainer
