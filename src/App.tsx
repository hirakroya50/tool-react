import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

const About = () => <h1>About Page</h1>;
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
