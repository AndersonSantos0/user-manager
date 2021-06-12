import { FiSearch } from 'react-icons/fi'

import Logo from '../Logo'
import SignOutModal from '../SignOutModal'
import { TopMenuContainer, TopMenuContent, SearchInputContainer } from './styles'
import Profile from './Profile'
import { useRouter } from 'next/router'
import { useState } from 'react'

const TopMenu = () =>{

  const router = useRouter()
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  return(
    <TopMenuContainer>
      <TopMenuContent>
        <div>
          <Logo onClick={()=>router.push('/')} size="3rem" color="var(--primary)" />
          <SearchInputContainer>
            <input placeholder="Pesquisar usuários" type="text" />
            <button>
              <FiSearch size={'1.25rem'} />
            </button>
          </SearchInputContainer>
        </div>
        <Profile showSignOutModal={()=>setShowSignOutModal(true)} />
      </TopMenuContent>
      <SignOutModal isOpen={showSignOutModal} onRequestClose={()=>setShowSignOutModal(false)} />
    </TopMenuContainer>
  )
}

export default TopMenu