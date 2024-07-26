import React from 'react'

import { useIsMounted } from 'lib/use-is-mounted'
import { ExternalUrls, Urls } from 'lib/urls'

import { AppShell, Group, Kbd, Space, Stack } from '@mantine/core'
import { ThemeSwitcher } from 'design-system/theme-switcher'
import { GitHubIcon, StarWarsIcon } from 'design-system/icons'
import { default as Link } from 'next/link'

import styles from './styles.module.css'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMounted } = useIsMounted()

  if (!isMounted) {
    return null
  }

  return (
    <AppShell
      header={{ height: 68 }}
      navbar={{
        width: 300,
        breakpoint: 'md'
      }}
      padding="md"
      withBorder={false}>
      <AppShell.Header px={{ base: 'md', md: 'xl' }} className={styles.header}>
        <Link href={Urls.HOME} className={styles.logo}>
          <StarWarsIcon />
        </Link>

        <div>
          <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd>
        </div>
      </AppShell.Header>

      <AppShell.Main
        px={{ base: 'md', md: 'xl' }}
        mih="100vh"
        component={Stack}>
        <Space h="xs" />
        {children}
        <Space h="lg" mt="auto" />
        <Group justify="space-between">
          <Link
            href={ExternalUrls.GITHUB_REPO}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.github}>
            <GitHubIcon />
          </Link>
          <ThemeSwitcher />
        </Group>
      </AppShell.Main>
    </AppShell>
  )
}
