import React, { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'lib/store'
import { useRouter } from 'next/router'

import { Meta } from 'components/meta'
import { Group, Loader } from '@mantine/core'
import { CharacterCard } from 'components/character-card'
import type { FilmModel } from 'lib/store/film'

export const Page: React.FC = () => {
  const { characterStore, planetStore, filmStore } = useRootStore()
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

  useEffect(() => {
    if (character) {
      Promise.all([character.fetchFilms(), character.fetchHomeworld()])
    }
  }, [character])

  return (
    <>
      <Meta title={character?.name || 'Loading character...'} />

      <Group justify="center">
        {character ? (
          <CharacterCard
            displayType="full"
            character={character}
            homeworld={
              planetStore.isFetching
                ? undefined
                : planetStore.getById(character.homeworldId)
            }
            films={
              filmStore.isFetching
                ? undefined
                : (character.filmIds
                    .map(id => filmStore.getById(id))
                    .filter(Boolean) as FilmModel[])
            }
          />
        ) : (
          <Loader mt="xl" />
        )}
      </Group>
    </>
  )
}

export default observer(Page)
