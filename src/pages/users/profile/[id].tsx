import { useState } from 'react'
import Head from 'next/head'
import { FiEdit2, FiTrash2, FiLock } from 'react-icons/fi'
import base64 from 'base-64'
import { Screen } from '../../../styles/global'
import AsideMenu from '../../../components/AsideMenu'
import ChangePasswordModal from '../../../components/ChangePasswordModal'
import RemoveUserModal from '../../../components/RemoveUserModal'
import { GetServerSideProps } from 'next'
import { api } from '../../../services/api'
import { UserType } from '../../../types/user'
import { useSession } from '../../../hooks/useSession'
import NotFound from '../../404'
import InternalServerError from '../../500'
import {
  UserContainer,
  UserProfile,
  UserProfileContainer,
  UserProfilePhoto,
  UserContentContainer,
  ActionButtonsContainer,
  UserContent
} from '../../../styles/pages/Profile'
import { useRouter } from 'next/router'

interface UserScreenProps {
  user?: UserType
  status: number
}

const UserScreen = ({ user, status }: UserScreenProps) => {
  // caso o servidor esteja fora do ar
  if (status === 500) return <InternalServerError />

  // caso o usuário não exista
  if (status === 404) return <NotFound />

  const session = useSession()
  const router = useRouter()

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false)

  return (
    <Screen>
      <Head>
        <title>
          {user.firstName} {user.lastName}
        </title>
      </Head>
      <UserContainer>
        <UserContentContainer>
          <AsideMenu />
          <section>
            <UserProfile>
              <UserProfileContainer>
                <UserProfilePhoto
                  image={user.image || '/images/default-user.png'}
                />
                <div>
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                  <h2>
                    {user.role === 'ADMIN' ? 'Administrador' : 'Usuário padrão'}
                  </h2>
                </div>
              </UserProfileContainer>
            </UserProfile>
            <UserContent>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <tbody>
                    <tr>
                      <td>Nome: </td>
                      <td>
                        <p>{user.firstName}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Sobrenome: </td>
                      <td>
                        <p>{user.lastName}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Email: </td>
                      <td>
                        <p>{user.email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Nascimento: </td>
                      <td>
                        <p>{user.birthDate}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Documento: </td>
                      <td>
                        <p>{user.document}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Senha: </td>
                      <td>
                        <p>{user.password}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {(session.user.id === user.id ||
                (session.user.role === 'ADMIN' && user.role === 'USER')) && (
                <ActionButtonsContainer>
                  {
                    // caso usuário logado seja Administrador
                    (session.user.role === 'ADMIN' && user.role === 'USER') ||
                    (session.user.role === 'ADMIN' &&
                      user.id === session.user.id) ? (
                      <>
                        <button
                          onClick={() => router.push('/users/edit/' + user.id)}
                          className="edit"
                        >
                          Editar usuário
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => setShowRemoveUserModal(true)}
                          type="button"
                          className="remove"
                        >
                          Remover usuário
                          <FiTrash2 />
                        </button>
                      </>
                    ) : (
                      // caso usuário logado não seja administrador e a conta da sessão é a mesma do perfil
                      session.user.id === user.id && (
                        <button
                          onClick={() => setShowChangePasswordModal(true)}
                          className="edit"
                        >
                          Alterar senha
                          <FiLock />
                        </button>
                      )
                    )
                  }
                </ActionButtonsContainer>
              )}
            </UserContent>
          </section>
        </UserContentContainer>
      </UserContainer>

      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onRequestClose={() => setShowChangePasswordModal(false)}
      />
      <RemoveUserModal
        user={user}
        isOpen={showRemoveUserModal}
        onRequestClose={() => setShowRemoveUserModal(false)}
      />
    </Screen>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.params

  try {
    const response = await api.get('/users/' + id)

    const passwordMask = base64
      .decode(response.data.password)
      .split('')
      .map(() => '*')

    return {
      props: {
        user: { ...response.data, password: passwordMask.join('') }
      }
    }
  } catch (err) {
    // caso servidor fora do are
    // ou algum erro que impeça a renderização das informações
    return {
      props: {
        status: err.response?.status || 500
      }
    }
  }
}

export default UserScreen
