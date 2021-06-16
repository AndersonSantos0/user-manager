import { useState, FormEvent } from 'react'
import Head from 'next/head'
import Switch from 'react-switch'
import base64 from 'base-64'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FiTrash2, FiSave } from 'react-icons/fi'
import { Screen } from '../../../styles/global'
import ActivityIndicator from '../../../components/ActivityIndicator'
import RemoveUserModal from '../../../components/RemoveUserModal'
import { GetServerSideProps } from 'next'
import Input from '../../../components/Input'
import AsideMenu from '../../../components/AsideMenu'
import { api } from '../../../services/api'
import { UserType } from '../../../types/user'
import ImagePicker from '../../../components/ImagePicker'
import NotFound from '../../404'
import InternalServerError from '../../500'
import {
  isBirthDateValid,
  isEmailValid,
  isDocumentValid,
  validateForm
} from '../../../utils/validation'
import {
  UsersScreenContainer,
  UsersScreenContent,
  UsersContainer
} from '../../../styles/pages/Users'
import { useSession } from '../../../hooks/useSession'
import { EditUserAPI } from '../../../services/userAPI'

interface UserEditProps {
  status: number
  user?: UserType
}

const UserEdit = ({ status, user }: UserEditProps) => {
  // Caso servidor fora do ar
  if (status === 500) return <InternalServerError />

  // Caso usuário não exista
  if (status === 404) return <NotFound />

  const router = useRouter()
  const session = useSession()

  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false)

  // dados do usuário cadastrado
  const [name, setName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [image, setImage] = useState(user.image)
  const [email, setEmail] = useState(user.email)
  const [birthDate, setBirthDate] = useState(user.birthDate)
  const [document, setDocument] = useState(String(user.document))
  const [password, setPassword] = useState(user.password)
  const [admin, setAdmin] = useState(user.role === 'ADMIN')

  // dados invalidados
  const [alreadyTakenEmail, setAlreadyTakenEmail] = useState('')
  const [alreadyTakenDocument, setAlreadyTakenDocument] = useState('')

  // flag de primeira tentativa
  const [submited, setSubmited] = useState(false)

  const [loading, setLoading] = useState(false)

  const validateEditUserForm = async () => {
    const formatedEmail = email.toLowerCase()

    return await validateForm(
      {
        firstName: name,
        lastName,
        email,
        birthDate,
        document,
        password
      },
      {
        userEmail: user.email,
        userDocument: user.document
      }
    ).catch(err => {
      switch (err.error) {
        case 'EMAIL_ALREADY_EXIST':
          setAlreadyTakenEmail(formatedEmail)
          break
        case 'DOC_ALREADY_EXIST':
          setAlreadyTakenDocument(document)
          break
      }

      if (err.message) {
        toast.error(err.message)
      } else {
        // caso ocorra algum erro que impessa a edição do usuário
        toast.error(
          'Não foi possível editar esse usuário agora, tente novamente mais tarde'
        )
      }
      return false
    })
  }

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault()

    if (
      session.user.role === 'ADMIN' &&
      user.role === 'ADMIN' &&
      session.user.id !== user.id
    )
      return toast.error('Você não pode editar as informações desse usuário')
    setSubmited(true)

    setLoading(true)

    const isFormValid = await validateEditUserForm()

    if (isFormValid)
      return EditUserAPI({
        id: user.id,
        firstName: name,
        lastName,
        image,
        birthDate,
        email,
        document,
        password,
        role: admin ? 'ADMIN' : 'USER'
      })
        .then(() => {
          if (session.user.id === user.id) {
            session.SignOut()
          } else {
            router.push('/users/profile/' + user.id)
          }

          toast.info('Usuário alterado com sucesso!')
        })
        .finally(() => setLoading(false))
    setLoading(false)
  }

  return (
    <Screen>
      <Head>
        <title>UserManager</title>
      </Head>
      <UsersScreenContainer>
        <UsersScreenContent>
          <AsideMenu />
          <section>
            <UsersContainer>
              <header>
                <h1>Editar usuário</h1>
              </header>
              <form onSubmit={onSubmitForm}>
                <section>
                  <ImagePicker value={image} onChange={e => setImage(e)} />
                  <section>
                    <Input
                      value={name}
                      error={submited && name.length < 2}
                      errorMessage={'Nome muito curto'}
                      onChange={setName}
                      label="Nome"
                      type="text"
                    />
                    <Input
                      value={lastName}
                      error={submited && lastName.length < 2}
                      errorMessage={'Sobrenome muito curto'}
                      onChange={setLastName}
                      label="Sobrenome"
                      type="text"
                    />
                  </section>
                </section>
                <section>
                  <Input
                    value={birthDate}
                    error={submited && !isBirthDateValid(birthDate)}
                    errorMessage={'Data inválida'}
                    onChange={setBirthDate}
                    label="Data nascimento"
                    type="date"
                  />
                  <Input
                    value={document}
                    error={
                      submited &&
                      (!isDocumentValid(document) ||
                        document === alreadyTakenDocument)
                    }
                    errorMessage={'Documento inválido'}
                    onChange={setDocument}
                    label="Documento"
                    type="document"
                  />
                </section>
                <section>
                  <Input
                    placeholder="exemplo@email.com"
                    value={email}
                    error={
                      submited &&
                      (!isEmailValid(email.toLowerCase()) ||
                        email.toLowerCase() === alreadyTakenEmail)
                    }
                    errorMessage={'Email inválido'}
                    onChange={setEmail}
                    label="Email"
                    type="text"
                  />
                  <Input
                    value={password}
                    error={submited && password.length < 8}
                    errorMessage={'Senha muito curta'}
                    onChange={setPassword}
                    label="Senha"
                    type="password"
                  />
                </section>
                <section>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: '1rem'
                    }}
                  >
                    <Switch
                      onColor={'#339aff'}
                      className="switch"
                      checked={admin}
                      onChange={setAdmin}
                    />
                    <label>Administrador</label>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => setShowRemoveUserModal(true)}
                      type="button"
                      className="remove"
                    >
                      Remover
                      <FiTrash2 />
                    </button>
                    <button disabled={loading} type="submit">
                      {loading && (
                        <ActivityIndicator
                          style={{
                            position: 'absolute',
                            backgroundColor: 'inherit',
                            width: '100%',
                            height: '1.5rem'
                          }}
                        />
                      )}
                      Salvar
                      <FiSave />
                    </button>
                  </div>
                </section>
                {/* caso usuário da sessão seja o mesmo do perfil */}
                {session.user.id === user.id && (
                  <p>Após editar esse usuário você será deslogado</p>
                )}
              </form>
            </UsersContainer>
          </section>
        </UsersScreenContent>
      </UsersScreenContainer>

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

    const passwordDecoded = base64.decode(response.data.password)

    return {
      props: {
        user: { ...response.data, password: passwordDecoded }
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

export default UserEdit
