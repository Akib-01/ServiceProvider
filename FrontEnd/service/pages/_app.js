import '@/styles/globals.css';
import { useRouter } from 'next/router';
import 'typeface-dosis';
import Navbar from './components/navbar';

export default function App({ Component, pageProps }) {
  const router =useRouter();
  const { pathname } = router;

  const isIndexPage = pathname === '/';
  return(
  <>
  {!isIndexPage && <Navbar />}
  <Component {...pageProps} />

  </>
  ) 
}
