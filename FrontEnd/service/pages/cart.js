import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const isLoggedIn = Cookies.get('isLoggedIn');
  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (isLoggedIn !== 'true') {
      router.push('/Signin');
    }
  }, [isLoggedIn, router]);
  useEffect(() => {
    // Fetch cart items from session storage
    const storedItems = sessionStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const handleRemoveItem = () => {
    // Clear cart items from session storage
    sessionStorage.removeItem('cartItems');
    setCartItems([]);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const item of cartItems) {
      totalPrice += parseFloat(item.price);
    }

    setTotalPrice(totalPrice.toFixed(2));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCheckoutAndPayment = () => {
    // Redirect to payment page with cart items and total price as query parameters
    const queryParams = {
      cartItems: JSON.stringify(cartItems),
      totalPrice: totalPrice,
    };

    router.push({
      pathname: '/payment',
      query: queryParams,
    });
  };

  return (
    <div className="container mx-auto py-10 p-[200px]">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-4 border-b border-gray-300">
              <img src={`../${item.id}.jpg`} alt={`Item ${item.id}`} className="w-16 h-16 mr-4 object-cover" />
              <div>
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-lg">${item.price}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold">Total Price:</p>
            <p className="text-lg font-bold">${totalPrice}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="mr-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleRemoveItem}
            >
              Clear Cart
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleCheckoutAndPayment}
            >
              Checkout &amp; Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
