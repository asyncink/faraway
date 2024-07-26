import React from 'react'

import type { CharacterModel } from 'lib/store/character'
import type { PlanetModel } from 'lib/store/planet'
import type { FilmModel } from 'lib/store/film'

import { getCharacterUrl } from 'lib/urls'
import { formatDate } from 'lib/intl'
import { modals } from '@mantine/modals'
import { ModalKey } from 'lib/modals'

import {
  Badge,
  Divider,
  Group,
  Paper,
  Text,
  Title,
  List,
  Loader,
  ActionIcon
} from '@mantine/core'
import { default as Link } from 'next/link'
import { FilmList } from 'features/film-list'
import { EditIcon } from 'design-system/icons'

interface CharacterCardProps {
  character: CharacterModel
  displayType: 'compact' | 'full'
  homeworld?: PlanetModel
  films?: FilmModel[]
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  homeworld,
  films,
  displayType
}) => {
  const isCompact = displayType === 'compact'

  const openNameModal = () => {
    modals.openContextModal({
      modal: ModalKey.NAME,
      title: 'Edit name',
      innerProps: { character }
    })
  }

  return (
    <Paper shadow="xs" p={isCompact ? 'sm' : 'md'} w={isCompact ? 260 : 320}>
      {isCompact ? (
        <Link href={getCharacterUrl(character.id)}>{character.name}</Link>
      ) : (
        <Group justify="space-between" align="center">
          <Title order={3}>{character.name}</Title>
          <ActionIcon variant="light" onClick={openNameModal}>
            <EditIcon size={16} />
          </ActionIcon>
        </Group>
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
            <Text size="sm">
              <Group align="center">
                Homeworld: {homeworld?.name || <Loader size="xs" type="dots" />}
              </Group>
            </Text>
            <Text size="sm">Gender: {character.gender}</Text>
          </Group>

          <Divider my="md" label="Appearance" labelPosition="left" />
          <Group justify="space-between">
            <Text size="sm">Hair: {character.hairColor}</Text>
            <Text size="sm">Skin: {character.skinColor}</Text>
            <Text size="sm">Eyes: {character.eyeColor}</Text>
          </Group>

          <Divider mt="md" mb="xs" label="Films" labelPosition="left" />
          <FilmList films={films} />
          <List size="sm" pl="sm" icon={'-'}></List>

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
