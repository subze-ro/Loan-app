import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left Column - Loan Master Section */}
      <div className="w-1/2 bg-red-600 flex items-center justify-center text-white text-6xl font-extrabold ">
        LOAN MASTER
      </div>

      {/* Right Column - Authentication Section */}
      <div className="w-1/2 flex flex-col justify-center items-center space-y-6 p-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
        <p className="text-center text-gray-600 text-lg">
          Effortless loan management at your fingertips
        </p>
        <div className="space-y-4 w-full max-w-xs">
          <Link
            to="/Register"
            className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/Login"
            className="block w-full text-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
