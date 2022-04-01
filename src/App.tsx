import "./App.css";
import Header from "./components/Header";
import MainPageRouter from "./components/MainPageRoute";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import ShoutoutByNameRouter from "./components/ShoutoutByNameRouter";
import MeRoute from "./components/MeRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPageRouter />} />
          <Route path="/user/:name" element={<ShoutoutByNameRouter />} />
          <Route path="/me" element={<MeRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
