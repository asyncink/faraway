import React from 'react'

import { useIsMounted } from 'lib/use-is-mounted'
import { Urls } from 'lib/urls'

import { AppShell, Kbd, Space, Stack } from '@mantine/core'
import { ThemeSwitcher } from 'design-system/theme-switcher'

import { LogoIcon } from 'design-system/icons'
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
          <LogoIcon />
        </Link>

        <ThemeSwitcher />

        <div>
          <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd>
        </div>
      </AppShell.Header>

      <AppShell.Main
        px={{ base: 'md', md: 'xl' }}
        mih="100vh"
        component={Stack}>
        {children}
        <Space h="lg" mt="auto" />
      </AppShell.Main>
    </AppShell>
  )
}
