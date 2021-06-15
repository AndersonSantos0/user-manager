import Lottie from 'react-lottie'
import { UsersNotFoundContainer } from './styles'
import EmptyAnimation from '../../animations/empty.json'

const EmptyAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: EmptyAnimation
}

const UsersNotFound = () => {
  return (
    <UsersNotFoundContainer>
      <Lottie
        options={EmptyAnimationOptions}
        height={'12rem'}
        width={'100%'}
        isStopped={false}
        isPaused={false}
        isClickToPauseDisabled={true}
      />
      <h1>Nenhum usuário encontrado</h1>
    </UsersNotFoundContainer>
  )
}

export default UsersNotFound
