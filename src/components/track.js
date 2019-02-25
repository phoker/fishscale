import styled from 'styled-components'
import { animated } from 'react-spring'

const Track = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  transform-origin: left top;
  will-change: transform;
  transition: transform 0s ease-out;
  transform: ${({ percent }) => `scaleX(${percent})`};
`

export default Track
