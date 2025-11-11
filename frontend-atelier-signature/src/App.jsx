import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormationsList from "./pages/FormationsList";
import FormationDetail from "./pages/FormationDetail";
import { AuthProvider } from "./context/AuthContext";
import Success from "./pages/Success";   
import Cancel from "./pages/Cancel";   

import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormationsList />} />
          <Route path="/formation/:id" element={<FormationDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}
