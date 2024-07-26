import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'lib/store'

import { Meta } from 'components/meta'
import { Badge, Button, Group } from '@mantine/core'
import { CharacterCard } from 'components/character-card'
import { AnimateGroup } from 'react-animate-mount'

import styles from './styles.module.css'

export const Page: React.FC = () => {
  const { characterStore } = useRootStore()

  useEffect(() => {
    if (!characterStore.isInitiallyFetched) {
      characterStore.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Meta title="Star Wars Characters" />

      {characterStore.isInitiallyFetched && (
        <>
          <Group justify="center" className={styles.group}>
            <AnimateGroup appear>
              {characterStore.items.map(character => (
                <CharacterCard
                  character={character}
                  key={character.id}
                  displayType="compact"
                />
              ))}
            </AnimateGroup>
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
                onClick={characterStore.fetchNextPage}
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
