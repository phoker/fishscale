import styled from 'styled-components'
import { animated } from 'react-spring'

const Track = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(98, 0, 238, 1);
  transform-origin: left top;
  will-change: transform;
  transition: transform 0.1s ease-out;
  transform: ${({ percent }) => `scaleX(${percent / 100})`};
`

export default Track