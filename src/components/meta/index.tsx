import React from 'react'
import Head from 'next/head'

export interface MetaProps {
  title: string
  description?: string
}

export const Meta: React.FC<MetaProps> = ({ title, description }) => {
  return (
    <Head>
      <meta property="og:locale" key="og:locale" content="ru_RU" />

      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      <meta property="og:type" key="og:type" content="website" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}
