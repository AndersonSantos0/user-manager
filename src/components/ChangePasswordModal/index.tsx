import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Lottie from 'react-lottie'
import Input from '../Input'
import { Container } from './styles'
import { useSession } from '../../hooks/useSession'
import ActivityAnimation from '../../animations/activity.json'

const ActivityAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: ActivityAnimation
}

interface ChangePasswordModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const ChangePasswordModal = ({
  isOpen,
  onRequestClose
}: ChangePasswordModalProps) => {
  const session = useSession()

  const [actualPassword, setActualPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [submited, setSubmited] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (actualPassword.length < 8) return false
    if (newPassword.length < 8) return false

    return true
  }

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()
    setSubmited(true)
    if (actualPassword === newPassword)
      return toast.error('As Senhas não podem ser iguais')

    const isValidated = validateForm()

    setLoading(true)
    if (isValidated)
      session
        .ChangePassword(actualPassword, newPassword)
        .then(() => {
          onRequestClose()
        })
        .catch(err => {
          toast.error(err)
        })
        .finally(() => setLoading(false))
  }

  return (
    <Modal
      overlayClassName={'react-modal-overlay'}
      className={'react-modal-content'}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        className="react-modal-close"
        onClick={onRequestClose}
        type="button"
      >
        <FiX size={'1.25rem'} />
      </button>
      <Container onSubmit={handleChangePassword}>
        <h2>Alterar senha</h2>
        <Input
          value={actualPassword}
          error={submited && actualPassword.length < 8}
          errorMessage={'Senha muito curta'}
          onChange={setActualPassword}
          label="Senha atual"
          type="password"
        />
        <Input
          value={newPassword}
          error={submited && newPassword.length < 8}
          errorMessage={'Senha muito curta'}
          onChange={setNewPassword}
          label="Senha nova"
          type="password"
        />
        <button disabled={loading} type="submit">
          {loading ? (
            <Lottie
              options={ActivityAnimationOptions}
              height={'1.6rem'}
              width={'1.6rem'}
              isStopped={false}
              isPaused={false}
              isClickToPauseDisabled={true}
            />
          ) : (
            'Salvar'
          )}
        </button>
      </Container>
    </Modal>
  )
}

export default ChangePasswordModal
