import Lottie from 'react-lottie'
import { BlankDashboardContainer } from './styles'
import EmptyAnimation from '../../animations/empty.json'
import React from 'react'

const EmptyAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: EmptyAnimation
}

const UsersNotFound = () => {
  return (
    <BlankDashboardContainer>
      <Lottie
        options={EmptyAnimationOptions}
        height={'12rem'}
        width={'100%'}
        isStopped={false}
        isPaused={false}
        isClickToPauseDisabled={true}
      />
      <h1>Nada de interessante por enquanto</h1>
    </BlankDashboardContainer>
  )
}

export default UsersNotFound
