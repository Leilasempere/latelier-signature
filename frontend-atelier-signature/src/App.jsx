import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormationsList from "./pages/FormationsList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormationsList />} />
      </Routes>
    </Router>
  );
}
