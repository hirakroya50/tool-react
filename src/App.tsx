import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import S3Service from "./pages/S3Service";
import { Toaster } from "react-hot-toast";
import Serverless from "./pages/Serverless";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
        containerStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-blue-600  shadow-md">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link
                to="/"
                className="text-white font-semibold hover:text-blue-300 transition duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/s3"
                className="text-white font-semibold hover:text-blue-300 transition duration-300"
              >
                S3
              </Link>
            </li>
            <li>
              <Link
                to="/serverless"
                className="text-white font-semibold hover:text-blue-300 transition duration-300"
              >
                Serverless
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/s3" element={<S3Service />} />
            <Route path="/serverless" element={<Serverless />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
