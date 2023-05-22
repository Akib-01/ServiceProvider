import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative bg-gray-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50 max-w-full inset-0"
          src="./footer.png"
          alt="Footer background"
        />
      </div>
      <div className="relative container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-400 leading-6">
              123 Main St, Anytown USA<br />
              support@example.com<br />
              (123) 456-7890
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Useful Links</h2>
            <ul className="list-none">
              <li className="mb-2">
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white">About Us</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/services">
                  <span className="text-gray-400 hover:text-white">Our Services</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog">
                  <span className="text-gray-400 hover:text-white">Blog</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact">
                  <span className="text-gray-400 hover:text-white">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Social Media</h2>
            <ul className="list-none">
              <li className="mb-2">
                <span href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f mr-2"></i> Facebook
                </span>
              </li>
              <li className="mb-2">
                <span href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter mr-2"></i> Twitter
                </span>
              </li>
              <li className="mb-2">
                <span href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram mr-2"></i> Instagram
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <h2 className="text-xl font-semibold text-white mb-4">Subscribe to Our Newsletter</h2>
            <form>
              <div className="flex items-center mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-2 w-full border border-gray-400 rounded-md text-gray-800 focus:outline-none focus:border-gray-600"
                />
                <button className="ml-2 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 lg:mt-16">
          <p className="text-gray-400 text-center">
            &copy; 2023 Quick fix. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
