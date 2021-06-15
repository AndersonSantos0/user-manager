import { useState, useMemo } from 'react'
import { PaginationIndexContainer } from './styles'
import { useRouter } from 'next/router'

interface PaginationIndexProps {
  actualPage: number
  totalPages: number
}

const PaginationIndex = ({ actualPage, totalPages }: PaginationIndexProps) => {
  const router = useRouter()

  const [linksCount] = useState(Array.from(Array(5).keys()))
  const startNumber = useMemo(() => {
    if (actualPage - 2 >= 1) return actualPage - 2
    if (actualPage - 1 >= 1) return actualPage - 1
    return actualPage
  }, [actualPage])

  const indexHandle = (page: number) => {
    router.push({
      pathname: router.route,
      query: { ...router.query, page }
    })
  }

  return (
    <PaginationIndexContainer>
      {actualPage - 2 > 1 && (
        <>
          <button onClick={() => indexHandle(1)}>1</button>
          {actualPage - 2 > 2 && '...'}
        </>
      )}
      {linksCount.map(idx => {
        if (startNumber + idx > totalPages) return <></>
        return (
          <button
            key={idx}
            onClick={() => indexHandle(startNumber + idx)}
            className={actualPage === startNumber + idx ? 'active' : null}
          >
            {startNumber + idx}
          </button>
        )
      })}
      {totalPages > 5 && startNumber + 4 < totalPages && (
        <>
          {startNumber + 5 < totalPages && '...'}
          <button onClick={() => indexHandle(totalPages)}>{totalPages}</button>
        </>
      )}
    </PaginationIndexContainer>
  )
}

export default PaginationIndex
