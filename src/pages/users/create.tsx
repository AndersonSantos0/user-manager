import { useState, FormEvent } from 'react'
import Head from 'next/head'
import Switch from 'react-switch'
import base64 from 'base-64'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FiSave } from 'react-icons/fi'
import ActivityIndicator from '../../components/ActivityIndicator'
import Input from '../../components/Input'
import AsideMenu from '../../components/AsideMenu'
import { api } from '../../services/api'
import {
  isBirthDateValid,
  isEmailValid,
  isDocumentValid,
  isDbUserFree
} from '../../utils/validation'
import {
  UsersScreenContainer,
  UsersScreenContent,
  UsersContainer
} from '../../styles/pages/Users'

const UserCreate = () => {
  const router = useRouter()
  // dados de cadastro
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
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

  const validateForm = async () => {
    const formatedDocument = Number(document.replace(/[^\d]+/g, ''))
    const formatedEmail = email.toLowerCase()

    if (name.length < 2) return false
    if (lastName.length < 2) return false
    if (!isBirthDateValid(birthDate)) return false
    if (!isDocumentValid(document)) return false
    if (!isEmailValid(formatedEmail)) return false
    if (password.length < 8) return false

    const [isEmailAlreadyTaken, isDocumentAlreadyTaken] = await isDbUserFree(
      formatedEmail,
      formatedDocument
    )

    if (isEmailAlreadyTaken) {
      toast.error('Email já cadastrado')
      setAlreadyTakenEmail(formatedEmail)
    }
    if (isDocumentAlreadyTaken) {
      toast.error('Documento já cadastrado')
      setAlreadyTakenDocument(document)
    }
    if (isEmailAlreadyTaken || isDocumentAlreadyTaken) return false

    return true
  }

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault()
    setSubmited(true)

    setLoading(true)

    const isFormValid = await validateForm()

    if (isFormValid)
      return api
        .post('/users', {
          firstName: name,
          lastName,
          birthDate,
          email: email.toLowerCase(),
          document: document.replace(/[^\d]+/g, ''),
          password: base64.encode(password),
          role: admin ? 'ADMIN' : 'USER'
        })
        .then(() => {
          router.push('/users')
          toast.success('Usuário criado com sucesso!')
        })
        .finally(() => setLoading(false))
    setLoading(false)
  }

  return (
    <div>
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
                          backgroundColor: 'var(--primary)'
                        }}
                        width="100%"
                        height="1.5rem"
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
    </div>
  )
}

export default UserCreate
