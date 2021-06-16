import { useState, FormEvent } from 'react'
import Head from 'next/head'
import Switch from 'react-switch'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FiSave } from 'react-icons/fi'
import ImagePicker from '../../components/ImagePicker'
import { Screen } from '../../styles/global'
import ActivityIndicator from '../../components/ActivityIndicator'
import Input from '../../components/Input'
import AsideMenu from '../../components/AsideMenu'
import {
  isBirthDateValid,
  isEmailValid,
  isDocumentValid,
  validateForm
} from '../../utils/validation'
import {
  UsersScreenContainer,
  UsersScreenContent,
  UsersContainer
} from '../../styles/pages/Users'
import { CreateUserAPI } from '../../services/userAPI'

const UserCreate = () => {
  const router = useRouter()
  // dados de cadastro
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  // dados invalidados
  const [alreadyTakenEmail, setAlreadyTakenEmail] = useState('')
  const [alreadyTakenDocument, setAlreadyTakenDocument] = useState('')

  // flag de primeira tentativa
  const [submited, setSubmited] = useState(false)

  const [loading, setLoading] = useState(false)

  const validateCreateUserForm = async () => {
    const formatedEmail = email.toLowerCase()

    return await validateForm({
      firstName: name,
      lastName,
      email,
      birthDate,
      document,
      password
    }).catch(err => {
      switch (err.error) {
        case 'EMAIL_ALREADY_EXIST':
          setAlreadyTakenEmail(formatedEmail)
          break
        case 'DOC_ALREADY_EXIST':
          setAlreadyTakenDocument(document)
          break
      }

      if (err.message) {
        switch (err.message) {
          case 'Network Error':
            toast.error('Problemas com o servidor, tente novamente mais tarde')
            break
          default:
            toast.error(err.message)
        }
      } else {
        toast.error(
          'Não foi possível editar esse usuário agora, tente novamente mais tarde'
        )
      }
      return false
    })
  }

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault()
    setSubmited(true)
    setLoading(true)

    const isFormValid = await validateCreateUserForm()

    if (isFormValid)
      return CreateUserAPI({
        firstName: name,
        email,
        image,
        birthDate,
        document,
        lastName,
        password,
        role: admin ? 'ADMIN' : 'USER'
      })
        .then(() => {
          router.push('/users')
          toast.info('Usuário criado com sucesso!')
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
                <h1>Criar usuário</h1>
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
                      (!isEmailValid(email.toLocaleLowerCase()) ||
                        email.toLocaleLowerCase() === alreadyTakenEmail)
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
                  <button disabled={loading} type="submit">
                    {loading && (
                      <ActivityIndicator
                        style={{
                          position: 'absolute',
                          backgroundColor: 'var(--primary)',
                          width: '100%',
                          height: '1.5rem'
                        }}
                      />
                    )}
                    Salvar
                    <FiSave />
                  </button>
                </section>
              </form>
            </UsersContainer>
          </section>
        </UsersScreenContent>
      </UsersScreenContainer>
    </Screen>
  )
}

export default UserCreate
