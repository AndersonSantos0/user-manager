import moment from 'moment'
import { useRouter } from 'next/router'
import { UserType } from '../../types/user'
import { UsersTableContainer } from './styles'

interface UsersTableProps {
  data: Omit<UserType, 'password'>[]
}

const UsersTable = ({ data = [] }: UsersTableProps) => {
  const router = useRouter()

  return (
    <div style={{ overflowX: 'auto' }}>
      <UsersTableContainer>
        <thead>
          <tr>
            <th>Nome</th>
            <th className={'TEmail'}>Email</th>
            <th className={'TBirth'}>Data nascimento</th>
            <th className={'TDoc'}>Documento</th>
          </tr>
        </thead>

        <tbody>
          {data.map(user => (
            <tr
              onClick={() => router.push('/users/profile/' + user.id)}
              key={user.id}
            >
              <td title={`${user.firstName} ${user.lastName}`}>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </td>
              <td title={`${user.email}`} className={'TEmail'}>
                <p>{user.email}</p>
              </td>
              <td
                title={`${moment(user.birthDate, 'DD-MM-YYYY')
                  .locale('pt-br')
                  .format('DD [de] MMM, YYYY')}`}
                className={'TBirth'}
              >
                <p>
                  {moment(user.birthDate, 'DD-MM-YYYY')
                    .locale('pt-br')
                    .format('DD [de] MMM, YYYY')}
                </p>
              </td>
              <td title={`${user.document}`} className={'TDoc'}>
                <p>{user.document}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </UsersTableContainer>
    </div>
  )
}

export default UsersTable
