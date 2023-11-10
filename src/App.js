import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change import to use Routes
import "./App.css";
import Density from "./Density/Density";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/Density" element={<Density />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
