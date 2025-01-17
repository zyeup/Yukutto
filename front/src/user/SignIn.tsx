import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { AuthContext } from "../App"
import { signIn } from "../api/auth"
import { SignInParams } from "../interfaces/index"

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        console.log("Error")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign In</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={!email || !password}
            className={`w-full py-2 text-sm font-medium text-white rounded-md ${email && password ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Submit
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up now!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
