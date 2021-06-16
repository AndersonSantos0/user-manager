import React from 'react'
import Lottie from 'react-lottie-player'
import ActivityAnimation from '../../animations/activity.json'

interface ActivityIndicatorProps {
  style?: React.CSSProperties
}

const ActivityIndicator = ({ style }: ActivityIndicatorProps) => {
  return <Lottie loop animationData={ActivityAnimation} play style={style} />
}

export default ActivityIndicator
