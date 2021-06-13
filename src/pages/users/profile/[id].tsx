import { useState } from 'react'
import Head from 'next/head'
import { FiEdit2, FiTrash2, FiLock } from 'react-icons/fi'
import base64 from 'base-64'
import { Screen } from '../../../styles/global'
import AsideMenu from '../../../components/AsideMenu'
import ChangePasswordModal from '../../../components/ChangePasswordModal'
import { GetServerSideProps } from 'next'
import { api } from '../../../services/api'
import { UserType } from '../../../types/user'
import { useSession } from '../../../hooks/useSession'
import {
  UserContainer,
  UserProfile,
  UserProfileContainer,
  UserProfilePhoto,
  UserContentContainer,
  ActionButtonsContainer,
  UserContent
} from '../../../styles/pages/Profile'

interface UserScreenProps {
  user: UserType
}

const UserScreen = ({ user }: UserScreenProps) => {
  const session = useSession()

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

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
              <table>
                <tbody>
                  <tr>
                    <td>Nome: </td>
                    <td>{user.firstName}</td>
                  </tr>
                  <tr>
                    <td>Sobrenome: </td>
                    <td>{user.lastName}</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Nascimento: </td>
                    <td>{user.birthDate}</td>
                  </tr>
                  <tr>
                    <td>Documento: </td>
                    <td>{user.document}</td>
                  </tr>
                  <tr>
                    <td>Senha: </td>
                    <td>{user.password}</td>
                  </tr>
                </tbody>
              </table>
              {(session.user.id === user.id ||
                session.user.role === 'ADMIN') && (
                <ActionButtonsContainer>
                  {
                    // caso usuário logar seja Administrador
                    session.user.role === 'ADMIN' ? (
                      <>
                        <button className="edit">
                          Editar usuário
                          <FiEdit2 />
                        </button>
                        <button className="remove">
                          Remover usuário
                          <FiTrash2 />
                        </button>
                      </>
                    ) : (
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
    </Screen>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.params
  const response = await api.get('/users/' + id)

  const passwordMask = base64
    .decode(response.data.password)
    .split('')
    .map(() => '*')

  return {
    props: {
      user: { ...response.data, password: passwordMask }
    }
  }
}

export default UserScreen
