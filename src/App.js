import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change import to use Routes
import "./App.css";
import Density from "./Density/Density";
import Sidebar from "./Sidebar/Sidebar";
import PoorHouseholds from "./PoorHouseholds/PoorHouseholds";
function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/Density" element={<Density />} />
          <Route path="/PoorHouseholds" element={<PoorHouseholds />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
