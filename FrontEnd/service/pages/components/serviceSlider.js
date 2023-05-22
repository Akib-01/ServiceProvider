import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";


const ServiceSlider = () => {
  const router =useRouter();
  const [services, setServices] = useState([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  //const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);
  const handleServiceClick = (service) => {
    router.push(`/service/${encodeURIComponent(service.name)}`);
    setSelectedService(service);
  };
  

  const handleCloseModal = () => {
    //setShowModal(false);
    setSelectedService(null);
  };
  const handlePrevClick = () => {
    setCurrentServiceIndex((currentServiceIndex - 1 + services.length) % services.length);
  };


  /*const handleOrderClick = (id) => {
    router.push({
        pathname: '/order',
        query: { id: id }
      });
      handleCloseModal();
  };*/

  useEffect(() => {
    axios
      .get("http://localhost:3000/service/get")
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleNextClick = () => {
    setCurrentServiceIndex((currentServiceIndex + 1) % services.length);
  };

  return (
    <div className="relative w-full md:w-[1200px] mx-auto">
  <div className="flex justify-between items-center px-5 md:px-10 mb-5">
    <h1 className="text-2xl font-bold absolute left-[-1px]">Our Services</h1><br/>
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrevClick}
        className={`${
          currentServiceIndex === 0
            ? "hidden"
            : "opacity-100 cursor-pointer"
        } bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none absolute top-[125px] left-[-50px] hover:bg-gray-300 transition duration-300`}
        disabled={currentServiceIndex === 0}
      >
        <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1.99951 16C1.99951 8.26801 8.26753 2 15.9995 2C23.7315 2 29.9995 8.26801 29.9995 16C29.9995 23.732 23.7315 30 15.9995 30C8.26753 30 1.99951 23.732 1.99951 16ZM16.7066 11.7071C17.0971 11.3166 17.0971 10.6834 16.7066 10.2929C16.3161 9.90237 15.6829 9.90237 15.2924 10.2929L10.2924 15.2929C9.90188 15.6834 9.90188 16.3166 10.2924 16.7071L15.2924 21.7071C15.6829 22.0976 16.3161 22.0976 16.7066 21.7071C17.0971 21.3166 17.0971 20.6834 16.7066 20.2929L13.4137 17H20.9995C21.5518 17 21.9995 16.5523 21.9995 16C21.9995 15.4477 21.5518 15 20.9995 15H13.4137L16.7066 11.7071Z" fill="#3A52EE"/>
        </svg>
      </button>
      <button
        onClick={handleNextClick}
        className={`${
          currentServiceIndex === services.length - 4
            ? "hidden"
            : "opacity-100 cursor-pointer"
        } bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none absolute top-[125px] right-[-10px] hover:bg-gray-300 transition duration-300`}
        disabled={currentServiceIndex === services.length - 4}
      >
        <svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16ZM15.2929 11.7071C14.9024 11.3166 14.9024 10.6834 15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929L21.7071 15.2929C22.0976 15.6834 22.0976 16.3166 21.7071 16.7071L16.7071 21.7071C16.3166 22.0976 15.6834 22.0976 15.2929 21.7071C14.9024 21.3166 14.9024 20.6834 15.2929 20.2929L18.5858 17H11C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15H18.5858L15.2929 11.7071Z" fill="#3A52EE"/>
        </svg>
      </button>
    </div>
  </div>
  <div className="flex overflow-x-auto pb-5 justify-center">
    {services
      .slice(currentServiceIndex, currentServiceIndex + 4)
      .map((service) => (
        <Link href={`/service/${encodeURIComponent(service.name)}`} key={service.id}>
        <div
          key={service.id}
          className="w-[280px] md:w-[250px] mr-10 cursor-pointer"
          onClick={() => handleServiceClick(service)}
        >
          <div className="relative h-64">
            <img
              src={`./${service.id}.jpg`}
              alt={service.title}
              className="absolute w-full h-full object-cover rounded-t-lg transition duration-300 transform hover:scale-110" />
            <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-6 rounded-b-lg">
              <h2 className="text-lg font-bold mb-2">{service.name}</h2>
              <p className="text-gray-700 text-sm leading-tight">
                {service.description}
              </p>
            </div>
          </div>
        </div>
        </Link>
      ))}
      
  </div>


{/*{showModal && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedService.name}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{selectedService.description}</p>
                <p className="mt-2 text-lg font-medium text-gray-900">Price: {selectedService.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleOrderClick(selectedService.id)}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Order
          </button>
          <button
            onClick={() => handleOrderClick(selectedService.id)}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Order
        </button>
        </div>
      </div>
    </div>
  </div>

)} */} </div>)

}

export default ServiceSlider;
