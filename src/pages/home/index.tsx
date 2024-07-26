import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from 'lib/store'

import { Meta } from 'design-system/meta'
import { Badge, Button, Group, Paper, Text } from '@mantine/core'
import { default as Link } from 'next/link'
import { getCharacterUrl } from 'lib/urls'
import { formatDate } from 'lib/intl'

export const Page: React.FC = () => {
  const { characterStore } = useRootStore()

  useEffect(() => {
    characterStore.fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Meta title="Star Wars Characters" />

      <Group justify="center">
        {characterStore.items.map(character => (
          <Paper shadow="xs" p="sm" key={character.url} w={260}>
            <Link href={getCharacterUrl(character.id)}>{character.name}</Link>

            <Group gap="xs" mt="sm">
              <Badge size="xs" variant="default" w={61}>
                updated
              </Badge>
              <Text size="xs">{formatDate(character.edited)}</Text>
            </Group>

            <Group gap="xs" mt={4}>
              <Badge size="xs" variant="default" w={61}>
                created
              </Badge>
              <Text size="xs">{formatDate(character.created)}</Text>
            </Group>
          </Paper>
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
  )
}

export default observer(Page)
