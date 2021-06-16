import { FiSearch } from 'react-icons/fi'
import Logo from '../Logo'
import SignOutModal from '../SignOutModal'
import {
  TopMenuContainer,
  TopMenuContent,
  SearchInputContainer
} from './styles'
import Profile from './Profile'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const TopMenu = () => {
  const router = useRouter()
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!searchValue.trim()) return router.push('/users')

    router.push({
      pathname: '/users',
      query: {
        search: searchValue
      }
    })
  }

  return (
    <TopMenuContainer>
      <TopMenuContent>
        <div>
          <Logo
            onClick={() => router.push('/')}
            size="3rem"
            color="var(--primary)"
          />
          <SearchInputContainer onSubmit={onSearchSubmit}>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Pesquisar usuários"
              type="text"
            />
            <button>
              <FiSearch size={'1.25rem'} />
            </button>
          </SearchInputContainer>
        </div>
        <Profile showSignOutModal={() => setShowSignOutModal(true)} />
      </TopMenuContent>
      <SignOutModal
        isOpen={showSignOutModal}
        onRequestClose={() => setShowSignOutModal(false)}
      />
    </TopMenuContainer>
  )
}

export default TopMenu
