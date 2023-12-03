import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change import to use Routes
import "./App.css";
import Density from "./Density/Density";
import Sidebar from "./Sidebar/Sidebar";
import GDP from "./GDP/GDP";
function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/Density" element={<Density />} />
          <Route path="/GDP" element={<GDP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
