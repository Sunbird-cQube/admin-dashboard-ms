import Layout from '@/components/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url: string) {
    setAuthorized(true);
    // if (!userService.userValue) {
    //     setAuthorized(false);
    //     router.push('/login');
    // } else {
    //     setAuthorized(true);
    // }
  }

  function getHeader() {
    return (
      <Head>
        <title>cQube Admin</title>
        <meta name="description" content="Admininstrator panel for cQube application" />
        <link rel="icon" href="favicon.ico" />
      </Head>
    );
  }

  if (authorized) {
    return (
      <Layout>
        {getHeader()}
        <Component {...pageProps} />
      </Layout>
    )
  } else if(Component.name === "LoginPage") {
    return (
      <>
        {getHeader()}
        <Component {...pageProps} />
      </>
    );
  }
}
