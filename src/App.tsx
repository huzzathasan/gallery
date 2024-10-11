import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import UploadMedia from "./components/UploadMedia";
import Login from "./components/Login";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/_app-admin" element={<UploadMedia />} />
        <Route path="/_app-admin-login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
