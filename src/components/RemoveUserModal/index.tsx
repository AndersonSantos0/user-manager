import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import ActivityIndicator from '../ActivityIndicator'
import { Container } from './styles'
import { UserType } from '../../types/user'
import { api } from '../../services/api'
import { useRouter } from 'next/router'
import { useSession } from '../../hooks/useSession'

interface RemoveUserModalProps {
  isOpen: boolean
  onRequestClose: () => void
  user: UserType
}

const RemoveUserModal = ({
  isOpen,
  onRequestClose,
  user
}: RemoveUserModalProps) => {
  const router = useRouter()
  const session = useSession()

  const [loading, setLoading] = useState(false)

  const handleRemove = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)

    api
      .delete('/users/' + user.id)
      .then(() => {
        toast.success('usuário removido com sucesso!')
        if (session.user.id === user.id) return session.SignOut()
        router.push('/users')
      })
      .catch(err => {
        console.log(err)
        toast.error(
          'Não foi possível remover este usuário. Tente novamente mais tarde'
        )
      })
      .finally(() => {
        setLoading(false)
      })
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
      <Container onSubmit={handleRemove}>
        <h2>Deseja realmente remover esse usuário?</h2>
        <p>
          Os dados de{' '}
          <span>
            {user.firstName} {user.lastName}
          </span>{' '}
          serão apagados e não poderão ser recuperados
        </p>
        {session.user.id === user.id && (
          <p className="sameHasSession">
            Após remover esse usuário você será deslogado
          </p>
        )}
        <div>
          <button type="button" onClick={onRequestClose} className="cancel">
            Cancelar
          </button>
          <button disabled={loading} type="submit">
            {loading ? (
              <ActivityIndicator width="1.5rem" height="1.5rem" />
            ) : (
              'Remover'
            )}
          </button>
        </div>
      </Container>
    </Modal>
  )
}

export default RemoveUserModal
