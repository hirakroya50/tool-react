import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import S3Service from "./components/S3Service";

const About = () => <h1>About Page</h1>;
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/s3">S3</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/s3" element={<S3Service />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
