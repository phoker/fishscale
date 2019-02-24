import styled from 'styled-components'
import { animated } from 'react-spring'

const knobSize = 10

const Knob = styled(animated.div)`
  background: rgba(98, 0, 238, 1);
  position: absolute;
  width: ${knobSize}px;
  height: ${knobSize}px;
  top: -${knobSize * 0.4}px;
  left: -${knobSize / 2}px;
  z-index: 1;
  border-radius: 50%;
  user-select: none;
  transition: transform 0.1s ease-out;
  transform: ${({ position }) => `translate3d(${position}px, 0, 0)`};
  cursor: move;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  &:focus, &:hover, &:active {
    &:before {
      transform: scale(3);
    }
  }
  &:before {
    background: rgba(98, 0, 238, 0.25);
    position: absolute;
    width: ${knobSize}px;
    height: ${knobSize}px;
    top: 0;
    left: 0;
    /* left: ${({ percent }) => `calc(${percent * 100}% - ${knobSize / 10}px)`}; */
    transform: scale(0);
    transition: transform 0.3s cubic-bezier(.4,0,.2,1),
    background-color 0.3s cubic-bezier(.4,0,.2,1);
    border-radius: 50%;
    opacity: ${({ down }) =>
    down
      ? '.2'
      : '.15'};
    content: "";
  }
`

export default Knob
