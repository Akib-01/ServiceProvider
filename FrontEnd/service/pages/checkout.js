import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Checkout = () => {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [time, settime] = useState(new Date().toISOString());
  const { query } = router;
  const serviceId=query.query1;
  console.log(serviceId)
  const BookingId=query.query2;
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleCheckoutClick = async (e) => {
    e.preventDefault();
    const data={
        BookingId,
        destination,
        time,
    }
    const res = await axios.post("http://localhost:3000/checkout/insert", data);
    axios
        .get("http://localhost:3000/checkout/latest")
        .then((response) => {
          const latestcheckoutid = response.data.id;
          console.log(serviceId)
          const CheckoutId = latestcheckoutid;
          router.push({
            pathname: "/payment",
            query: { serviceId,CheckoutId },
          });
        })
        .catch((error) => {
          console.error("Error fetching latest booking:", error);
        });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleCheckoutClick}>
          <label className="block font-medium mb-2" htmlFor="destination">
            Destination:
          </label>
          <input
            id="destination"
            type="text"
            className="border border-gray-400 rounded w-full py-2 px-3 mb-4"
            value={destination}
            onChange={handleDestinationChange}
            required
          />

          <label className="block font-medium mb-2" htmlFor="time">
            Checkout Time:
          </label>
          <input
            id="time"
            type="datetime-local"
            className="border border-gray-400 rounded w-full py-2 px-3 mb-4"
            value={time}
            onChange={(e) => settime(e.target.value)}
            required
          />

          <input type="hidden" name="id" value={serviceId} />

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};


export default Checkout;
