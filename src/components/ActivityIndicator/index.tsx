import React from 'react'
import Lottie from 'react-lottie'
import ActivityAnimation from '../../animations/activity.json'

const ActivityAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: ActivityAnimation
}

interface ActivityIndicatorProps {
  width?: number | string
  height?: number | string
  isStopped?: boolean
  isPaused?: boolean
  isClickToPauseDisabled?: boolean
  style?: React.CSSProperties
}

const ActivityIndicator = ({
  width = '100%',
  height = '100%',
  isStopped = false,
  isPaused = false,
  isClickToPauseDisabled = true,
  style
}: ActivityIndicatorProps) => {
  return (
    <Lottie
      style={style}
      options={ActivityAnimationOptions}
      height={height}
      width={width}
      isStopped={isStopped}
      isPaused={isPaused}
      isClickToPauseDisabled={isClickToPauseDisabled}
    />
  )
}

export default ActivityIndicator
