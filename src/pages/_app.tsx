import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>cQube Admin</title>
        <meta name="description" content="Admininstrator panel for cQube application" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
