import Lottie from 'react-lottie-player'
import { UsersNotFoundContainer } from './styles'
import EmptyAnimation from '../../animations/empty.json'

const UsersNotFound = () => {
  return (
    <UsersNotFoundContainer>
      <Lottie
        loop
        animationData={EmptyAnimation}
        play
        style={{ width: '100%', height: '12rem' }}
      />
      <h1>Nenhum usuário encontrado</h1>
    </UsersNotFoundContainer>
  )
}

export default UsersNotFound
