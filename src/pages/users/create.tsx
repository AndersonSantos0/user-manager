import Head from 'next/head'

import { useEffect, useState } from 'react'
import Switch from 'react-switch'
import { FormEvent } from 'react'
import { isBirthDateValid, IsEmailValid, isDocumentValid } from '../../utils/validation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Input from '../../components/Input'
import AsideMenu from '../../components/AsideMenu'
import { api } from '../../services/api'

const base64 = require('base-64')

import { 
  HomeContainer,
  HomeContent,
  UsersContainer,
} from '../../styles/pages/Users'



const UserCreate = () => {
  const router = useRouter()
  // user data values
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')
  const [admin , setAdmin] = useState(false)

  //first submit flag
  const [submited, setSubmited] = useState(false)

  const validateForm = () =>{
      if(name.length < 2)return false
      if(lastName.length < 2)return false
      if(!isBirthDateValid(birthDate))return false
      if(!isDocumentValid(document))return false
      if(!IsEmailValid(email))return false
      if(password.length < 8)return false

      return true
  }

  const onSubmitForm = (e: FormEvent) =>{
    e.preventDefault()
    setSubmited(true)

    const isFormValid = validateForm()

    if(isFormValid)return api.post('/users', {
        firstName: name,
        lastName,
        birthDate,
        email,
        document: document.replace(/[^\d]+/g, ''),
        password: base64.encode(password),
        role: admin ? "ADMIN" : "USER"
      }
    ).then(()=>{
      router.push('/users')
      toast.success('Usuário criado com sucesso!')
    })
  }

  return (
    <div>
      <Head>
        <title>UserManager</title>
      </Head>
      <HomeContainer>
        <HomeContent>
        <AsideMenu />
          <section>
            <UsersContainer>
              <header>
                <h1>Criar usuário</h1>
              </header>
              <form onSubmit={onSubmitForm}>
                <section>
                  <Input value={name} error={submited && name.length < 2} errorMessage={'Nome muito curto'} onChange={setName} label="Nome" type="text" />
                  <Input value={lastName} error={ submited && lastName.length < 2} errorMessage={'Sobrenome muito curto'} onChange={setLastName} label="Sobrenome" type="text" />
                </section>
                <section>
                  <Input value={birthDate} error={submited && !isBirthDateValid(birthDate)} errorMessage={'Data inválida'} onChange={setBirthDate} label="Data nascimento" type="date" />
                  <Input value={document} error={submited && !isDocumentValid(document)} errorMessage={'Documento inválido'} onChange={setDocument} label="Documento" type="document" />
                </section>
                <section>
                  <Input placeholder="exemplo@email.com" value={email} error={submited && !IsEmailValid(email)} errorMessage={'Email inválido'} onChange={setEmail} label="Email" type="text" />
                  <Input value={password} error={ submited && password.length < 8} errorMessage={'Senha muito curta'} onChange={setPassword} label="Senha" type="password" />
                </section>
                <section>
                  <div style={{alignItems: 'center', display: 'flex', gap: '1rem'}}>
                    <Switch onColor={'#339aff'} className="switch" checked={admin} onChange={setAdmin}/>
                    <label>Administrador</label>
                  </div>
                  <input type="submit" value="Salvar" />
                </section>
              </form>
            </UsersContainer>
          </section>
        </HomeContent>
      </HomeContainer>
    </div>
  )
}

export default UserCreate
