import '@mantine/core/styles.css'
import '@mantine/spotlight/styles.css'
import 'styles/global.css'

import React from 'react'
import type { AppProps } from 'next/app'
import { MODALS } from 'lib/modals'

import { MANTINE_THEME } from 'lib/theme'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Layout } from 'design-system/layout'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={MANTINE_THEME}>
      <ModalsProvider modals={MODALS}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
