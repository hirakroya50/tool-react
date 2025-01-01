import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import S3Service from "./components/S3Service";
import { Toaster } from "react-hot-toast";

const About = () => <h1>About Page</h1>;
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
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
                to="/about"
                className="text-white font-semibold hover:text-blue-300 transition duration-300"
              >
                About
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
          </ul>
        </nav>
        <div className="grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/s3" element={<S3Service />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
