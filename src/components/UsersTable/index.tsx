import moment from 'moment'
import { useRouter } from 'next/router'
import { UserType } from '../../types/user'
import { UsersTableContainer } from './styles'

interface UsersTableProps {
  data: UserType[]
}

const UsersTable = ({ data = [] }: UsersTableProps) => {
  const router = useRouter()

  return (
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
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td className={'TEmail'}>{user.email}</td>
            <td className={'TBirth'}>
              {moment(user.birthDate, 'DD-MM-YYYY')
                .locale('pt-br')
                .format('DD [de] MMM, YYYY')}
            </td>
            <td className={'TDoc'}>{user.document}</td>
          </tr>
        ))}
      </tbody>
    </UsersTableContainer>
  )
}

export default UsersTable
