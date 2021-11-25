import { Header } from '../components/common/Header';
import '../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
