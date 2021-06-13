import { FiLogOut } from 'react-icons/fi'
import { useSession } from '../../../hooks/useSession'
import { useRouter } from 'next/router'
import {
  ProfileContainer,
  ProfileImageContainer,
  ProfileUserContainer,
  ProfileLogoutContainer
} from './styles'

interface PofileProps {
  showSignOutModal: () => void
}

const Profile = ({ showSignOutModal }: PofileProps) => {
  const router = useRouter()
  const session = useSession()

  const goToProfile = () => {
    router.push('/users/profile/' + session.user.id)
  }

  return (
    <ProfileContainer>
      <ProfileUserContainer>
        <div onClick={goToProfile}>
          <h1>
            {session.user.firstName} {session.user.lastName}
          </h1>
          <p>{session.user.email}</p>
        </div>
      </ProfileUserContainer>
      <ProfileImageContainer
        onClick={goToProfile}
        image={session.user.image || '/images/default-user.png'}
      />
      <ProfileLogoutContainer>
        <button onClick={showSignOutModal}>
          <FiLogOut />
        </button>
      </ProfileLogoutContainer>
    </ProfileContainer>
  )
}

export default Profile
