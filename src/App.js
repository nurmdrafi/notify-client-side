import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RequireAuth from "./pages/RequireAuth";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
