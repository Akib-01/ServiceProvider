import axios from "axios";
import { useState } from "react";
import Sidebar from "../components/sidebar";
export default function Report({ reports }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchOptionChange(event) {
    setSearchOption(event.target.value);
  }

  const filteredData = reports.filter((item) => {
    if (searchOption === "id") {
      return item.id.toString().includes(searchTerm);
    } else if (searchOption === "type") {
      return item.paymentType.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === "details") {
      return item.paymentInfo.toLowerCase().includes(searchTerm.toLowerCase());
    } 
    return true;
  });

  return (<>
    <Sidebar/>
    <div className="container mx-auto">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-gray-300 p-2 w-64 rounded-lg mr-4"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <select
          className="border-2 border-gray-300 p-2 rounded-lg"
          value={searchOption}
          onChange={handleSearchOptionChange}
        >
          <option value="id">ID</option>
          <option value="type">Type</option>
          <option value="details">Details</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/6 p-4">
                ID
              </th>
              <th className="w-1/6 p-4">
                Payment Type
              </th>
              <th className="w-1/6 p-4">
                Payment Info
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="text-center p-4">
                  {item.id}
                </td>
                <td className="text-center p-4">
                  {item.paymentType}
                </td>
                <td className="text-center p-4">
                  {item.paymentInfo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps() {
  const result = await axios.get("http://localhost:3000/payment/get");
  const reports = result.data;
  return { props: { reports } };
}
