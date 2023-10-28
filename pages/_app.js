import React from 'react'
import Head from 'next/head'

import '../styles/app.scss'

const MyApp = ({ Component, pageProps: { ...pageProps }, router }) => {

  return (
    <>
      <Head>
        <title>Ask My Book: The Minimalist Entrepreneur</title>
      </Head>
      <Component key={router.asPath.split('?')[0]} {...pageProps} />
    </>
  )
}

export default MyApp
