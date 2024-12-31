import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Industry from "./pages/Industry";
import Location from "./pages/Location";
import Service from "./pages/Service";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Locations from "./pages/Locations";
import AIServices from "./pages/AIServices";
import Sitemap from "./pages/Sitemap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<Industry />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:state/:city" element={<Location />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service" element={<Service />} />
        <Route path="/ai-services" element={<AIServices />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </Router>
  );
}

export default App;