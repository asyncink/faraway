import '@mantine/core/styles.css'
import '@mantine/spotlight/styles.css'
import 'styles/global.css'

import React from 'react'
import type { AppProps } from 'next/app'

import { MANTINE_THEME } from 'lib/theme'
import { MantineProvider } from '@mantine/core'

import { Layout } from 'design-system/layout'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={MANTINE_THEME}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  )
}

export default App
