import { FormEvent } from 'react'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import { Container } from './styles'
import { useSession } from '../../hooks/useSession'

interface ChangePasswordModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const ChangePasswordModal = ({
  isOpen,
  onRequestClose
}: ChangePasswordModalProps) => {
  const session = useSession()

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault()
    session.SignOut()
    onRequestClose()
  }

  return (
    <Modal
      overlayClassName={'react-modal-overlay'}
      className={'react-modal-content'}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <button
        className="react-modal-close"
        onClick={onRequestClose}
        type="button"
      >
        <FiX size={'1.25rem'} />
      </button>
      <Container>
        <h2>
          <span>{session.user.firstName}</span> tem certeza que deseja sair
          dessa sessão?
        </h2>
        <div>
          <button onClick={onRequestClose}>Cancelar</button>
          <button className={'signout'} onClick={handleSignOut}>
            Sair
          </button>
        </div>
      </Container>
    </Modal>
  )
}

export default ChangePasswordModal
