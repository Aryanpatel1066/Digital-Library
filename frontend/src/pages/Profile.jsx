 import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 mt-10">No user logged in</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
       <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Profile
      </h1>

        {user.photoURL && (
        <img
          src={user.photoURL}
          alt={user.name || "User"}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
      )}
     
      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}
