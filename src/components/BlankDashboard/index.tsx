import Lottie from 'react-lottie-player'
import { BlankDashboardContainer } from './styles'
import EmptyAnimation from '../../animations/empty.json'
import React from 'react'

const UsersNotFound = () => {
  return (
    <BlankDashboardContainer>
      <Lottie
        loop
        animationData={EmptyAnimation}
        play
        style={{ width: '100%', height: '12rem' }}
      />
      <h1>Nada de interessante por enquanto</h1>
    </BlankDashboardContainer>
  )
}

export default UsersNotFound
