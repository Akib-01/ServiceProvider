import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Feedback({ feedback }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("rating");

  const filteredFeedback = feedback.filter((item) => {
    if (searchOption === "id") {
      return item.id.toString().includes(searchTerm);
    }
    else if (searchOption === "rating") {
      return item.rating.toString().includes(searchTerm);
    } 
    else if (searchOption === "comment") {
      return item.comment.toLowerCase().includes(searchTerm.toLowerCase());
    } 
    else if (searchOption === "serviceName") {
      return item.Service.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchOptionChange(event) {
    setSearchOption(event.target.value);
  }

  return (
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
          <option value="rating">Rating</option>
          <option value="comment">Comment</option>
          <option value="serviceName">Service Name</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
          <th className="text-center p-2">ID</th>
            <th className="text-center p-2">Rating</th>
            <th className="text-center p-2">Comment</th>
            <th className="text-center p-2">Service Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="text-center p-2">{item.id}</td>
              <td className="text-center p-2">{item.rating}</td>
              <td className="text-center p-2">{item.comment}</td>
              <td className="text-center p-2">
                {item.Service.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:3000/feedback/get");
  return { props: { feedback: data } };
}
