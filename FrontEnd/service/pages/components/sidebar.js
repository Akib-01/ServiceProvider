import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-48 px-2 py-6 fixed inset-y-0">
      <div className="text-white text-xl font-bold mb-8">Dashboard</div>
      <ul className="text-white">
      <li className="mb-4">
          <Link href="/dashboard/profile">
            <span className="block hover:text-gray-200">Profile</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/payment-history">
            <span className="block hover:text-gray-200">Payment History</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/order-history">
            <span className="block hover:text-gray-200">Order History</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Sidebar;
