import Head from 'next/head'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { Screen } from '../../styles/global'
import InternalServerError from '../500'
import UsersTable from '../../components/UsersTable'
import AsideMenu from '../../components/AsideMenu'
import { api } from '../../services/api'
import { GetServerSideProps } from 'next'
import { UserType } from '../../types/user'
import { useSession } from '../../hooks/useSession'
import {
  UsersScreenContainer,
  UsersScreenContent,
  UsersContainer
} from '../../styles/pages/Users'
import PaginationIndex from '../../components/PaginationIndex'
import UsersNotFound from '../../components/UsersNotFound'

interface UserScreenProps {
  status?: number
  users: Omit<UserType, 'password'>[]
  totalUsers: number
  totalPages: number
  actualPage: number
}

const UsersScreen = ({
  users = [],
  totalUsers,
  totalPages,
  actualPage,
  status
}: UserScreenProps) => {
  const session = useSession()

  // caso o servidor esteja fora do ar
  if (status === 500) return <InternalServerError />

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
                <h1>Usuários</h1>
                {/* caso o usuário da sessão seja administrador */}
                {session.user.role === 'ADMIN' && (
                  <Link href="/users/create">
                    <a>
                      Adicionar usuário
                      <FiPlus size={'1.5rem'} />
                    </a>
                  </Link>
                )}
              </header>
              {/* caso a list ade usuários esteja vazia */}
              {users.length === 0 ? (
                <UsersNotFound />
              ) : (
                <UsersTable data={users} />
              )}

              <footer>
                <p>{totalUsers} resultados</p>
                <PaginationIndex
                  actualPage={actualPage}
                  totalPages={totalPages}
                />
              </footer>
            </UsersContainer>
          </section>
        </UsersScreenContent>
      </UsersScreenContainer>
    </Screen>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const query = ctx.query

  const quantity = query?.qtd || 5
  const actualPage = Number(query?.page) || 1

  try {
    const response = await api.get('/users', {
      params: {
        q: query?.search,
        _limit: quantity,
        _page: actualPage
      }
    })

    const totalUsers = response.headers['x-total-count']
    const totalPages = Math.ceil(totalUsers / Number(quantity))

    return {
      props: {
        users: response.data,
        totalUsers,
        totalPages,
        actualPage,
        status: 200
      }
    }
  } catch {
    // caso o servidor esteja fora do ar
    // ou ocorra algum erro que impessa a renderização dos usuários em tela
    return {
      props: {
        users: [],
        totalUsers: 0,
        totalPages: 0,
        actualPage: 0,
        status: 500
      }
    }
  }
}

export default UsersScreen
