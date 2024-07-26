import { useEffect, useState } from 'react'

export const useIsMounted = (): { isMounted: boolean } => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return { isMounted }
}
