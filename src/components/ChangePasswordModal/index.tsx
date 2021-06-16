import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import ActivityIndicator from '../ActivityIndicator'
import Input from '../Input'
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

    // caso senhas sejam iguais
    if (actualPassword === newPassword)
      return toast.error('As Senhas não podem ser iguais')

    const isValidated = validateForm()

    setLoading(true)
    if (isValidated)
      session
        .ChangePassword(actualPassword, newPassword)
        .catch(err => {
          toast.error(err.message)
        })
        .finally(() => setLoading(false))
  }

  return (
    <Modal
      overlayClassName={'react-modal-overlay'}
      className={'react-modal-content'}
      ariaHideApp={false}
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
        <p>Após alterar a senha você será deslogado</p>
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
            <ActivityIndicator style={{ width: '100%', height: '1.5rem' }} />
          ) : (
            'Salvar'
          )}
        </button>
      </Container>
    </Modal>
  )
}

export default ChangePasswordModal
