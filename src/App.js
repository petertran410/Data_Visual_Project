import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change import to use Routes
import "./App.css";
import Density from "./Density/Density";
import Age from "./Age/Age";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/Density" element={<Density />} />
          <Route path="/Age" element={<Age />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
