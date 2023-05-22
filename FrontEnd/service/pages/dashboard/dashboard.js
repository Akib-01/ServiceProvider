import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Sidebar from '../components/sidebar';

export default function Dashboard() {
  const router = useRouter();
  const isLoggedIn = Cookies.get('isLoggedIn');

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (isLoggedIn !== 'true') {
      router.push('/Signin');
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <Sidebar/>
    </div>
  );
}
