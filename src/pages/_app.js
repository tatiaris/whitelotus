import { Provider } from 'next-auth/client';
import { Header } from '../components/common/Header';
import '../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
