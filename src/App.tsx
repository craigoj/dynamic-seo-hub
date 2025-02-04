import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Service from "./pages/Service";
import LocalService from "./pages/LocalService";
import Industry from "./pages/Industry";
import LocalIndustry from "./pages/LocalIndustry";
import Location from "./pages/Location";
import StateLocation from "./pages/StateLocation";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Locations from "./pages/Locations";
import AIServices from "./pages/AIServices";
import Sitemap from "./pages/Sitemap";
import SitemapXML from "./pages/SitemapXML";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service" element={<Service />} />
        <Route path="/services/:service/:state/:city" element={<LocalService />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:industry" element={<Industry />} />
        <Route path="/industries/:industry/:state/:city" element={<LocalIndustry />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:state" element={<StateLocation />} />
        <Route path="/locations/:state/:city" element={<Location />} />
        <Route path="/ai-services" element={<AIServices />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/sitemap.xml" element={<SitemapXML />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;