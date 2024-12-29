import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Industry from "./pages/Industry";
import Location from "./pages/Location";
import Service from "./pages/Service";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/industries/:slug" element={<Industry />} />
        <Route path="/locations/:state/:city" element={<Location />} />
        <Route path="/services/:service" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;