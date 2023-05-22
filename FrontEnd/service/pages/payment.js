import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const PaymentPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user,setUser]=useState([]);
  const deliveryCharge = 5; // Example delivery charge

  useEffect(() => {
    const initialTotalPrice = Math.round(parseInt(router.query.totalPrice || 0));
    setTotalPrice(initialTotalPrice);
  }, []);
  useEffect(() => {
    // Fetch cart items from session storage
    const storageData = sessionStorage.getItem('cartItems');
    const parsedData = JSON.parse(storageData);
    const cartItems = parsedData ? parsedData : []; // Default to an empty array if cartItems is null or undefined
    
    // Access the id of the first cart item
    const firstCartItem = cartItems.length > 0 ? cartItems[0] : null;
    const firstCartItemId = firstCartItem ? firstCartItem.id : null;
    setCartItems(firstCartItemId);
    
    console.log(firstCartItemId);
    const storedItem = sessionStorage.getItem('user');
    if (storedItem) {
      setUser(JSON.parse(storedItem));
    }
    setIsLoading(false);
  }, []);


  const handleConfirmOrder = async () => {
    let time = new Date().toLocaleString() + ""
    const formData={
      destination:deliveryLocation,
      time: time,
      paymentType:paymentMethod,
      paymentPrice:totalPrice+deliveryCharge,
      serviceId:cartItems,
      userListId:user.id,

    }
    try {
      const response = await axios.post('http://localhost:3000/checkout/insert/', formData);
      // Handle the API response as needed
      console.log(response.data);
      // Clear the form inputs
      setDeliveryLocation('');
      setPaymentMethod('creditCard');
      setCouponCode('');
      setErrorMessage('');
      setTotalPrice(0);
      // Redirect to success page
      console.log(sessionStorage)
      sessionStorage.removeItem('cartItems')
      console.log(sessionStorage)
      router.push('/success');
    } catch (error) {
      // Handle API error
      console.error(error);
    }
  };

  const handleApplyCoupon = () => {
    // Apply coupon code logic
    // You can customize this logic based on your requirements
    if (couponCode === 'HAPPY') {
      // Apply 10% discount
      const discountAmount = (totalPrice * 0.1).toFixed(2);
      const discountedPrice = (totalPrice - discountAmount).toFixed(2);
      setErrorMessage('');
      setTotalPrice(discountedPrice);
      window.alert('Coupon applied successfully!');
    } else {
      setErrorMessage('Invalid coupon code');
    }
  };

  return (
    <div className="container mx-auto md:p-[200px] mb:absolute mb:top-[-80px]">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      <div className="p-6 bg-zinc-400 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Delivery Details</h2>
        <form onSubmit={handleSubmit(handleConfirmOrder)}>
          <div className="mb-4">
            <label htmlFor="deliveryLocation" className="block mb-1 font-semibold text-gray-800">
              Delivery Location
            </label>
            <input
              type="text"
              id="deliveryLocation"
              className={`w-full px-4 py-2 border rounded ${errors.deliveryLocation ? 'border-red-500' : ''}`}
              value={deliveryLocation}
              {...register('deliveryLocation', { required: 'Delivery location is required.' })}
              onChange={(e) => setDeliveryLocation(e.target.value)}
            />
            {errors.deliveryLocation && <p className="text-red-500 mt-1">{errors.deliveryLocation.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block mb-1 font-semibold text-gray-800">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className="w-full px-4 py-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="mt-8 bg-green-200 p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-bold">${totalPrice}</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <p className="text-gray-600">Delivery Charge</p>
              <p className="font-bold">${deliveryCharge}</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">${totalPrice + deliveryCharge}</p>
            </div>

            <div className="mt-4">
              <label htmlFor="couponCode" className="block mb-1 font-semibold text-gray-800">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="couponCode"
                  className="w-2/3 px-4 py-2 border rounded"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-2 rounded"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              type="submit"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
