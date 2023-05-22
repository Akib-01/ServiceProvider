const RecordSection = () => {
  const servicesProvided = "25000+";
  const ordersCompleted = "20000+";
  const employees = "200+";

  return (
    <div className="bg-gray-200 py-12 h-[350px] p-[188px] hidden lg:block">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
          Our Records
        </h2>
        <div className="flex flex-wrap justify-center items-center -mx-4">
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Services Provided
              </h3>
              <p className="text-4xl text-gray-600 font-semibold mb-2">
                {servicesProvided}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Orders Completed
              </h3>
              <p className="text-4xl text-gray-600 font-semibold mb-2">
                {ordersCompleted}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Employees
              </h3>
              <p className="text-4xl text-gray-600 font-semibold mb-2">
                {employees}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordSection;
