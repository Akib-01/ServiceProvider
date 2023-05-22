import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <><Sidebar/>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4">Profile</h2>
          {user ? (
            <>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date of Birth:</span> {user.DOB}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Username:</span> {user.username}
              </p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
