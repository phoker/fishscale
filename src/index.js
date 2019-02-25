import React, { memo, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring } from 'react-spring'
import { useGesture } from 'react-with-gesture'
import useBoundingclientrect from '@rooks/use-boundingclientrect'

import Knob from './components/knob'
import Track from './components/track'
import Tab from './components/tab'
import Container from './components/container'
import { usePrevious } from './constants'

const onClick = (onChangeProp, width, getBoundingClientRect) => e => {
  e.preventDefault()
  const percent = getFraction(e.pageX - getBoundingClientRect.left, width)
  onChangeProp(percent)
}

const getPosition = (x, currentPosition, min, max) => {
  const position = currentPosition + x
  if (position < min) return min
  if (position > max) return max
  return position
}

const getFraction = (position, width) => {
  const fraction = position / width
  if (fraction < 0) return 0
  if (fraction > 1) return 1
  return fraction
}

const getFillStyle = (down, width, position) => x => {
  if (x && down) return `scaleX(${getFraction(getPosition(x, position, 0, width), width)})`
}

const getTransformStyle = (down, prevDown, width, onChange, position) => x => {
  const percent = getFraction(getPosition(x, position, 0, width), width)
  if (x && !down && (down !== prevDown)) {
    onChange(percent)
  }
  if (x && down) return `calc(${percent * 100}% - 5px)`
}

const onChange = (onChangeProp, min, max) => value => {
  onChangeProp(denormalize(value, min, max))
}

const normalize = (value, min, max) => ((value - min) / (max - min))

const denormalize = (percent, min, max) => Math.ceil((((max - min) * percent) + min))

const WhiteCastle = ({
  className,
  value,
  min,
  max,
  color,
  onChange: onChangeProp
}) => {
  const containerRef = useRef()
  const getBoundingClientRect = useBoundingclientrect(containerRef)
  const width = (getBoundingClientRect && getBoundingClientRect.width)

  const normalizedValue = normalize(value, min, max)
  const currentPosition = normalizedValue * width
  const [ position, setPosition ] = useState(() => currentPosition)
  useEffect(() => {
    setPosition(currentPosition)
  }, [ value, currentPosition, width ])

  const [ down, setDown ] = useState(false)
  const prevDown = usePrevious(down)

  const [ { x }, set ] = useSpring(() => ({ x: 0, delay: 0 }))
  const bind = useGesture(({ down: gestureDown, delta: [ deltaX ] }) => {
    if (Math.abs(deltaX) > 1) setDown(gestureDown)
    set({
      x: gestureDown ? deltaX : 0
    })
  })
  return (
    <>
      <Container
        className={className}
        ref={containerRef}
        color={color}
        onClick={
          onClick(
            onChange(onChangeProp, min, max),
            width,
            getBoundingClientRect
          )
        }
      >
        <Track
          {...bind()}
          color={color}
          percent={normalizedValue}
          style={{
            transform: x.interpolate(getFillStyle(down, width, position))
          }}
        />
        <Knob
          {...bind()}
          color={color}
          position={currentPosition}
          percent={normalizedValue}
          down={Boolean(down).toString()}
          style={{
            left: x.interpolate(
              getTransformStyle(
                down,
                prevDown,
                width,
                onChange(onChangeProp, min, max),
                position
              )
            )
          }}
        >
          <Tab
            color={color}
            down={down}
          >
            {width && (
              <span>{denormalize(getFraction(position + x.getValue(), width), min, max)}</span>
            )}
          </Tab>
        </Knob>
      </Container>
    </>
  )
}

WhiteCastle.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  percentValue: PropTypes.bool,

  onChange: PropTypes.func
}

WhiteCastle.defaultProps = {
  color: '#6200EE',
  value: 0,
  min: 0,
  max: 100
}

export default memo(WhiteCastle)
