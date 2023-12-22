import React from "react";
import { NavLink } from "react-router-dom";

export default function ColSideBar() {
  return (
    <div className="mr-3">
      <NavLink to="/" className="btn btn-success">
        Home
      </NavLink>
      <NavLink to="/Density" className="btn btn-success">
        Density
      </NavLink>
      <NavLink to="/Age" className="btn btn-success">
        Age
      </NavLink>
      <NavLink to="/GDP" className="btn btn-success">
        GDP
      </NavLink>
      <NavLink to="/PoorHouseholds" className="btn btn-success">
        Poor Households
      </NavLink>
    </div>
  );
}
