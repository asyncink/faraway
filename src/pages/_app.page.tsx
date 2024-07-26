import '@mantine/core/styles.css'
import 'styles/global.css'

import React from 'react'
import type { AppProps } from 'next/app'
import { MODALS } from 'lib/modals'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Layout } from 'components/layout'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MantineProvider>
      <ModalsProvider modals={MODALS}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
