import React, { useMemo } from 'react'

import type { FilmModel } from 'lib/store/film'

import { Badge, Group, List, Loader } from '@mantine/core'

interface FilmListProps {
  films?: FilmModel[]
}

export const FilmList: React.FC<FilmListProps> = ({ films }) => {
  const nodes = useMemo(
    () =>
      films?.map(film => (
        <List.Item key={film.id}>
          <Group align="center" gap={4}>
            {film.title}{' '}
            <Badge size="xs" variant="default">
              {film.year}
            </Badge>
          </Group>
        </List.Item>
      )),
    [films]
  )

  if (!films) {
    return <Loader size="xs" type="dots" />
  }

  if (!films.length) {
    return 'No films'
  }

  return (
    <List size="sm" pl="sm" icon={'-'}>
      {nodes}
    </List>
  )
}
