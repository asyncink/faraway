import React from 'react'

import {
  Switch,
  useMantineTheme,
  useMantineColorScheme,
  useComputedColorScheme
} from '@mantine/core'
import { MoonIcon, SunIcon } from 'design-system/icons'
import { useIsMounted } from 'lib/use-is-mounted'

export const ThemeSwitcher: React.FC = () => {
  const { isMounted } = useIsMounted()
  const { toggleColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme()
  const theme = useMantineTheme()

  if (!isMounted) {
    return null
  }

  return (
    <Switch
      defaultChecked={colorScheme === 'light'}
      onChange={() => window.setTimeout(toggleColorScheme, 100)}
      size="lg"
      radius="sm"
      onLabel={<MoonIcon size={16} color={theme.colors.blue[6]} />}
      offLabel={<SunIcon size={16} color={theme.colors.yellow[4]} />}
      color={
        colorScheme === 'light' ? theme.colors.gray[2] : theme.colors.dark[4]
      }
    />
  )
}
