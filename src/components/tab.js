import styled from 'styled-components'
import { readableColor } from 'polished'

const Tab = styled.div`
  font-family: sans-serif;
  font-weight: lighter;
  font-size: 12px;
  background: ${({ color }) => color};
  color: ${({ color }) => readableColor(color)};
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  transition: transform 0s ease-out;
  transform: ${({ down }) => `rotate(-45deg) scale(${down ? 1 : 0})`};
  width: 26px;
  height: 26px;
  border-radius: 50% 50% 50% 0;
  z-index: 1;
  top: -35px;
  left: calc(50% - 12px);

  & > span {
    transform: rotate(45deg);
  }
`
export default Tab
