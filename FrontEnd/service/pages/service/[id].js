import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CartIcon from '../components/CartIcon';

const ServicePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [feedbackId,setfeedbackId]=useState(0);
  const isLoggedIn = Cookies.get('isLoggedIn');
  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (isLoggedIn !== 'true') {
      router.push('/Signin');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/service/getByName/${encodeURIComponent(id)}`)
        .then((response) => setService(response.data))
        .catch((error) => console.log(error));
    }

    // Load cart count from session storage
    const cartItems = sessionStorage.getItem('cartItems') || '[]';
    const updatedCartItems = JSON.parse(cartItems);
    setCartCount(updatedCartItems.length);
  }, [id]);

  const handleAddToCart = () => {
    const cartItems = sessionStorage.getItem('cartItems') || '[]';
    const updatedCartItems = JSON.parse(cartItems);
  
    // Check if cart is not empty and item ID is different
    if (updatedCartItems.length > 0 && updatedCartItems[0].id !== service.id) {
      const confirmReplace = window.confirm(
        'Adding this item will replace the previous item in the cart. Do you want to proceed?'
      );
  
      if (confirmReplace) {
        updatedCartItems.splice(0, updatedCartItems.length);
      } else {
        return; // Cancel the action
      }
    }
  
    // Store the item details in the cart
    const itemDetails = {
      id: service.id,
      name: service.name,
      price: service.price,
    };
    updatedCartItems.push(itemDetails); // Store the item details
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
    setCartCount(updatedCartItems.length);
    animateCartIcon();
    console.log('Item added to cart');
  };
  
  
  const animateCartIcon = () => {
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.classList.add('animated');
    setTimeout(() => {
      cartIcon.classList.remove('animated');
    }, 1000);
  };

  const handleViewCart = () => {
    router.push('/cart');
  };
  const handleIncreaseCount = () => {
    const cartItems = sessionStorage.getItem('cartItems') || '[]';
    const updatedCartItems = JSON.parse(cartItems);
    updatedCartItems.push(service);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    setCartCount((prevCount) => prevCount + 1);
    animateCartIcon();
  };

  const handleDecreaseCount = () => {
    const cartItems = sessionStorage.getItem('cartItems') || '[]';
    const updatedCartItems = JSON.parse(cartItems);
    if (updatedCartItems.length > 0) {
      updatedCartItems.pop();
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      setCartCount((prevCount) => prevCount - 1);
      animateCartIcon();
    }
  };
  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(../${service.id}.jpg)` }}
    >
      <div className="bg-white bg-opacity-75 px-5 py-8 md:px-12 md:py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
        <p className="text-lg text-gray-600 mb-6">{service.description}</p>
        <div className="flex items-center mb-6">
          <span className="text-gray-600 text-lg mr-2">Type:</span>
          <span className="text-gray-800 font-bold text-lg">{service.type}</span>
        </div>
        <div className="flex items-center mb-6">
          <span className="text-gray-600 text-lg mr-2">Availability:</span>
          <span className={`text-${service.isAvailable ? 'green' : 'red'}-600 font-bold text-lg`}>
            {service.isAvailable ? 'Available' : 'Not available'}
          </span>
        </div>
        <div className="flex items-center mb-8">
          <span className="text-gray-600 text-lg mr-2">Price:</span>
          <span className="text-gray-800 font-bold text-lg">{service.price}</span>
        </div>
        <button
          className="bg-[#a32f60] hover:bg-[#be4a7a] hover:text-black text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        {' '} &nbsp;  &nbsp; 
        <button
          className="bg-[#a32f60] hover:bg-[#be4a7a] hover:text-black text-white font-bold py-2 px-4 rounded"
          onClick={handleViewCart}
        >
          View Cart
        </button>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            className="py-2 px-3 border-r border-gray-300"
            onClick={handleDecreaseCount}
            disabled={cartCount === 0}
          >
            -
          </button>
          <div id="cartIcon" className="mt-4">
              <CartIcon cartCount={cartCount} />
          </div>
          <button className="py-2 px-3 border-l border-gray-300" onClick={handleIncreaseCount}>
            +
          </button>
        </div>
      </div>
      </div>
  );
};

export default ServicePage;
