import React, { useContext } from "react"
import { AuthContext } from "../App"

const User:React.FC = () => {

  const { currentUser } = useContext(AuthContext)

  const user = {
    name: currentUser?.name,
    email: currentUser?.email,
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Name:</span> {user.name}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Email:</span> {user.email}
        </p>
      </div>
    </div>
  )
}

export default User;
