import React from 'react'

import type { CharacterModel } from 'lib/store/character'
import { getCharacterUrl } from 'lib/urls'
import { formatDate } from 'lib/intl'

import { Badge, Divider, Group, Paper, Text, Title, List } from '@mantine/core'
import { default as Link } from 'next/link'

interface CharacterCardProps {
  character: CharacterModel
  displayType: 'compact' | 'full'
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  displayType
}) => {
  const isCompact = displayType === 'compact'

  return (
    <Paper shadow="xs" p={isCompact ? 'sm' : 'md'} w={isCompact ? 260 : 320}>
      {isCompact ? (
        <Link href={getCharacterUrl(character.id)}>{character.name}</Link>
      ) : (
        <Title order={3}>{character.name}</Title>
      )}

      {!isCompact && (
        <>
          <Group justify="space-between" mt="sm">
            <Text size="sm">Birth: {character.birthYear}</Text>
            <Text size="sm">Height: {character.height}</Text>
            <Text size="sm">Mass: {character.mass}</Text>
          </Group>

          <Divider my="md" label="Common" labelPosition="left" />
          <Group justify="space-between">
            <Text size="sm">Homeworld: {character.homeworld}</Text>
            <Text size="sm">Gender: {character.gender}</Text>
          </Group>

          <Divider my="md" label="Appearance" labelPosition="left" />
          <Group justify="space-between">
            <Text size="sm">Hair: {character.hairColor}</Text>
            <Text size="sm">Skin: {character.skinColor}</Text>
            <Text size="sm">Eyes: {character.eyeColor}</Text>
          </Group>

          <Divider mt="md" mb="xs" label="Films" labelPosition="left" />
          <List size="sm" pl="sm" icon={'-'}>
            {character.films.map(film => (
              <List.Item key={film}>{film}</List.Item>
            ))}
          </List>

          <Divider mt="md" mb="xs" label="Updates" labelPosition="left" />
        </>
      )}

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
  )
}
