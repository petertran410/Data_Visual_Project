import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Change import to use Routes
import "./App.css";
import Density from "./Density/Density";
import Age from "./Age/Age";
// import Sidebar from "./Sidebar/Sidebar";
import PoorHouseholds from "./PoorHouseholds/PoorHouseholds";
import GDP from "./GDP/GDP";
import ColSideBar from "./Sidebar/ColSideBar";
import Home from "./Home/Home";
import Sidebar from "./Sidebar/Sidebar";
function App() {
  return (
    <div className="">
      <Router>
        <div className="d-flex">
          <div>
            {/* <ColSideBar /> */}
            <Sidebar />
          </div>
          <div className="ml-5 w-50 mt-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Density" element={<Density />} />
              <Route path="/GDP" element={<GDP />} />
              <Route path="/Age" element={<Age />} />
              <Route path="/PoorHouseholds" element={<PoorHouseholds />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
