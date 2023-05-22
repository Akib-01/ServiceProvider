import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = router;
  const isIndexPage = pathname === '/';
  /*const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);*/
  

  useEffect(() => {
    setIsLoggedIn(Cookies.get("isLoggedIn") === "true");
  }, [Cookies.get("isLoggedIn")]);
  

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleLogout() {
    Cookies.set("isLoggedIn", "false");
    setIsLoggedIn(false);
    sessionStorage.removeItem('user')
    sessionStorage.setItem("isLoggedIn", "false")
    router.push("/Signin");
  }
  
  return (
    <div className={`sticky top-0 z-50 ${isIndexPage ? 'bg-transparent' : 'bg-[#ded2c5]'}`}>
      <ul className={`flex max-w-6xl mx-auto p-4 justify-end font-bold ${isIndexPage ? 'text-[#2b241d]' : 'text-[#14100b]'} `}>
        <li className="px-2">
          <Link href="/">
            <img
              src="/logo.png"
              className="absolute w-[75px] h-[38px] left-[150px] top-[8px]"
              alt=""
            />
          </Link>
        </li>
        <li className="px-2 hidden md:block">
          <Link href="/">
            <p className="hover:text-black transition duration-300 transform hover:scale-110">Home</p>
          </Link>
        </li>
        {/*<li className="px-2 hidden md:block">
          <Link href="/about">
            <p className="hover:text-black transition duration-300 transform hover:scale-110">About Us</p>
          </Link>
        </li>*/}
        <li className="px-2 hidden md:block">
          <Link href="/cart">
            <p className="hover:text-black transition duration-300 transform hover:scale-110">Cart</p>
          </Link>
        </li>
        {!isLoggedIn && (
          <>
            <li className="px-2 hidden md:block">
              <Link href="/Signin">
                <p className="hover:text-black transition duration-300 transform hover:scale-110">Log in</p>
              </Link>
            </li>
            <li className="px-2 hidden md:block">
              <Link href="/signup">
                <p className="hover:text-black transition duration-300 transform hover:scale-110">Sign up</p>
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li className="px-2 hidden md:block">
              <Link href="/dashboard/dashboard">
                <p className="hover:text-black transition duration-300 transform hover:scale-110">Dashboard</p>
              </Link>
            </li>
            <li className="px-2 hidden md:block">
              <button
                className="hover:text-black transition duration-300 transform hover:scale-110 focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
        <li className="px-2 md:hidden">
          <button className="focus:outline-none" onClick={handleToggle}>
            {isOpen ? (
              <svg
                className="w-6 h-6 text-white transition duration-300 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white transition duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </li>
      </ul>
      {isOpen && (
        <div className="bg-gray-600 md:hidden">
          <ul className="flex flex-col text-center">
            <li className="py-2">
              <Link href="/">
                <p className="hover:text-black transition duration-300">Home</p>
              </Link>
            </li>
            {/*}
            <li className="py-2">
              <Link href="/about">
                <p className="hover:text-black transition duration-300">About Us</p>
              </Link>
      </li>*/}
            <li className="py-2">
              <Link href="/cart">
                <p className="hover:text-black transition duration-300">Cart</p>
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="py-2">
                  <Link href="/Signin">
                    <p className="hover:text-black transition duration-300">Log in</p>
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="/signup">
                    <p className="hover:text-black transition duration-300">Sign up</p>
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="py-2">
                  <button className="hover:text-black transition duration-300" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <Link href="/dashboard/dashboard">
                  <p className="hover:text-black transition duration-300 transform hover:scale-110">Dashboard</p>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>

);
}
