import React, { memo, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring } from 'react-spring'
import { useGesture } from 'react-with-gesture'
import useBoundingclientrect from '@rooks/use-boundingclientrect'

import Knob from './components/knob'
import Track from './components/track'
import Container from './components/container'
import { usePrevious } from './constants'

const onClick = (onChange, setPosition, width, getBoundingClientRect, min, max) => e => {
  e.preventDefault()
  const percent = getPercentage(e.pageX - getBoundingClientRect.left, width)
  onChange(denormalize(percent, min, max))
  setPosition(e.pageX - getBoundingClientRect.left)
}

const getPosition = (x, currentPosition, min, max) => {
  const position = currentPosition + x
  if (position < min) return min
  if (position > max) return max
  return position
}

const getRatio = (position, width) => position / width

const getPercentage = (position, width) => getRatio(position, width) * 100

const getFillStyle = (down, width, position) => x => {
  if (x && down) return `scaleX(${getRatio(getPosition(x, position, 0, width), width)})`
}

const getTransformStyle = (down, prevDown, width, onChange, position) => x => {
  const currentPosition = getPosition(x, position, 0, width)
  if (x && !down && (down !== prevDown)) {
    onChange(getPercentage(currentPosition, width), currentPosition)
  }
  if (x && down) return `translate3d(${currentPosition}px, 0, 0)`
}

const onChange = (onChangeProp, setPosition, min, max) => (value, position) => {
  onChangeProp(denormalize(value, min, max))
  setPosition(position)
}

const normalize = (value, min, max) => ((value - min) / (max - min)) * 100

const denormalize = (percent, min, max) => (((max - min) * (percent / 100)) + min)

const useInitialPosition = (setPosition, initialPosition) => {
  useEffect(() => { setPosition(initialPosition) })
  return null
}

const Fishscale = ({
  className,
  value,
  min,
  max,
  onChange: onChangeProp
}) => {
  const containerRef = useRef()
  const getBoundingClientRect = useBoundingclientrect(containerRef)
  const width = (getBoundingClientRect && getBoundingClientRect.width)
  const normalizedValue = normalize(value, min, max)
  const initialPosition = (normalizedValue / 100) * width
  const [ position, setPosition ] = useState(() => (normalizedValue / 100) * width)
  const [ down, setDown ] = useState(false)
  const prevDown = usePrevious(down)
  const [ { x }, set ] = useSpring(() => ({ x: 0, delay: 0 }))
  const bind = useGesture(({ down: gestureDown, delta: [ deltaX ] }) => {
    if (Math.abs(deltaX) > 1) setDown(gestureDown)
    set({
      x: gestureDown ? deltaX : 0
    })
  })
  useInitialPosition(setPosition, initialPosition)
  return (
    <>
      <Container
        className={className}
        ref={containerRef}
        onClick={
          onClick(
            onChangeProp,
            setPosition,
            width,
            getBoundingClientRect,
            min,
            max
          )
        }
      >
        <Track
          {...bind()}
          percent={normalizedValue}
          style={{
            transform: x.interpolate(getFillStyle(down, width, position))
          }}
        />
        <Knob
          {...bind()}
          percent={normalizedValue}
          position={position}
          style={{
            transform: x.interpolate(
              getTransformStyle(
                down,
                prevDown,
                width,
                onChange(onChangeProp, setPosition, min, max),
                position
              )
            )
          }}
        />
      </Container>
    </>
  )
}

Fishscale.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func
}

Fishscale.defaultProps = {
  value: 0,
  min: 0,
  max: 100
}

export default memo(Fishscale)
