import React, { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'lib/store'
import { useRouter } from 'next/router'

import { Meta } from 'design-system/meta'
import { Group, Loader } from '@mantine/core'
import { CharacterCard } from 'features/character-card'

export const Page: React.FC = () => {
  const { characterStore } = useRootStore()
  const { query } = useRouter()

  const character = useMemo(
    () => characterStore.getById(query.id as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [characterStore.isFetching, query.id]
  )

  useEffect(() => {
    if (typeof query.id === 'string') {
      characterStore.fetchById(query.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id])

  return (
    <>
      <Meta title={character?.name || 'Loading character...'} />

      <Group justify="center">
        {character ? (
          <CharacterCard character={character} displayType="full" />
        ) : (
          <Loader mt="xl" />
        )}
      </Group>
    </>
  )
}

export default observer(Page)
