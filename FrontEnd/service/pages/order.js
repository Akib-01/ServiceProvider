import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function order() {
  const router = useRouter();
  const isLoggedIn = Cookies.get('isLoggedIn');
  const { id } = router.query;
  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (isLoggedIn !== 'true') {
      router.push('/Signin');
    }
  }, [isLoggedIn, router]);
  const [service, setService] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:3000/service/get/${id}`).then((response) => {
      setService(response.data);
    });
  }, [id]);

  // Handle the booking of the service
  const [bookingTime, setBookingTime] = useState(null);
  const handleBookClick = () => {
    // Validate that the service is available at the selected time
    if (!service.isAvailable) {
      alert("The selected service is not available.");
      return;
    }

    // Use the API to book the service
    axios.post("http://localhost:3000/booking/insert", {
        serviceId: id,
        time: bookingTime,
      });
      axios
        .get("http://localhost:3000/booking/latest")
        .then((response) => {
          const latestBookingId = response.data.id;
          const query1 = id;
          const query2 = latestBookingId;
          router.push({
            pathname: "/checkout",
            query: { query1, query2 },
          });
        })
        .catch((error) => {
          console.error("Error fetching latest booking:", error);
        });
    }

  // Display the details of the service and provide a booking option
  return (
<div className="flex justify-center items-center h-screen">
  <div className="w-full max-w-md p-5">
    {service && (
      <div className="mb-5">
        <img src={`./${service.id}.jpg`} alt={service.name} className="w-full mb-5" />
        <h1 className="text-2xl font-bold mb-3">{service.name}</h1>
        <p className="mb-3">{service.description}</p>
        <h2 className="font-bold mb-2">Book this Service:</h2>
        <div className="flex items-center">
          <label htmlFor="booking-time" className="mr-3">
            Time:
          </label>
          <input
            type="datetime-local"
            id="booking-time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            className="border rounded p-1"
          />

          <button
            onClick={handleBookClick}
            disabled={!bookingTime}
            className={`ml-3 bg-blue-500 text-white px-3 py-1 rounded ${
              !bookingTime && "opacity-50 cursor-not-allowed"
            }`}
          >
            Book Service
          </button>
        </div>
      </div>
    )}
  </div>
</div>


  );
        }
