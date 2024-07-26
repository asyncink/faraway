import { randomBytes } from 'crypto'

import { Head, Html, Main, NextScript } from 'next/document'
import { ColorSchemeScript } from '@mantine/core'

const Document = () => {
  const nonce = randomBytes(128).toString('base64')
  const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`

  return (
    <Html lang="ru">
      <Head nonce={nonce}>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  )
}

export default Document
