import { Provider } from 'next-auth/client';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import '../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </GeistProvider>
  );
}
