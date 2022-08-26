import '../../styles/globals.scss';
import { AppProps } from '../../node_modules/next/app';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
