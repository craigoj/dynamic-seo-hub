import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Industry from "./pages/Industry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/industries/:slug" element={<Industry />} />
      </Routes>
    </Router>
  );
}

export default App;