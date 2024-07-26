import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'lib/store'

import { Meta } from 'design-system/meta'
import { Badge, Button, Group } from '@mantine/core'
import { CharacterCard } from 'features/character-card'

export const Page: React.FC = () => {
  const { characterStore } = useRootStore()

  useEffect(() => {
    if (!characterStore.isInitiallyFetched) {
      characterStore.fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Meta title="Star Wars Characters" />

      {characterStore.isInitiallyFetched && (
        <>
          <Group justify="center">
            {characterStore.items.map(character => (
              <CharacterCard
                character={character}
                key={character.id}
                displayType="compact"
              />
            ))}
          </Group>

          <Group justify="center" mt="sm">
            {characterStore.isFullyFetched ? (
              !characterStore.isFetching && (
                <Badge color="green" variant="white">
                  All characters fetched
                </Badge>
              )
            ) : (
              <Button
                variant="outline"
                onClick={characterStore.fetch}
                loading={characterStore.isFetching}>
                Fetch more
              </Button>
            )}
          </Group>
        </>
      )}
    </>
  )
}

export default observer(Page)
