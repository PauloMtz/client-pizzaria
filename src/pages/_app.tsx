import '../../styles/globals.scss';
import { AppProps } from '../../node_modules/next/app';
import 'react-toastify/dist/ReactToastify.css'; // yarn add react-toastify
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
