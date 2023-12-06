import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change import to use Routes
import "./App.css";
import Density from "./Density/Density";
import Age from "./Age/Age";
import Sidebar from "./Sidebar/Sidebar";
import PoorHouseholds from "./PoorHouseholds/PoorHouseholds";
import GDP from "./GDP/GDP";
function App() {
  return (
    <Router>
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/Density" element={<Density />} />
          <Route path="/GDP" element={<GDP />} />
          <Route path="/Age" element={<Age />} />
          <Route path="/PoorHouseholds" element={<PoorHouseholds />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
