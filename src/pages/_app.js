import { Provider } from 'next-auth/client';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { Header } from '../components/common/Header';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import '../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Provider session={pageProps.session}>
        <Header />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </GeistProvider>
  );
}
