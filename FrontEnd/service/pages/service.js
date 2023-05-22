import axios from 'axios';
import { useRouter } from 'next/router';

const ServicePage = ({ service }) => {
  const router = useRouter();
  const { id } = router.query;

  // Render a loading state while fetching the service data
  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      {/* Display additional service details here */}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`http://localhost:3000/service/get/${params.id}`);
    const service = response.data;

    return {
      props: {
        service,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        service: null,
      },
    };
  }
}

export default ServicePage;
