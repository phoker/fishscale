import styled from 'styled-components'
import { animated } from 'react-spring'
import { transparentize } from 'polished'

const Knob = styled(animated.div)`
  background: ${({ color }) => color};
  position: absolute;
  width: 10px;
  height: 10px;
  top: -4px;
  left: -5px;
  z-index: 1;
  border-radius: 50%;
  user-select: none;
  transition: transform 0s ease-out;
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
    background: ${({ color }) => transparentize(0.75, color)};
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0;
    left: 0;
    transform: scale(0);
    transition: transform 0.1s cubic-bezier(.4, 0, .2, 1),
    background-color 0.1s cubic-bezier(.4, 0, .2, 1);
    border-radius: 50%;
    opacity: ${({ down }) =>
    down
      ? '.2'
      : '.15'};
    content: "";
  }
`

export default Knob
