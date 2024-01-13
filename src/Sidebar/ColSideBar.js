import React from "react";
import { useNavigate } from "react-router-dom";

export default function ColSideBar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn btn-success">
        Home
      </button>
      <button
        onClick={() => {
          navigate("/Density");
        }}
        className="btn btn-success">
        Density
      </button>
      <button
        onClick={() => {
          navigate("/GDP");
        }}
        className="btn btn-success">
        GDP
      </button>
      <button
        onClick={() => {
          navigate("/Diploma");
        }}
        className="btn btn-success">
        Diploma
      </button>
    </div>
  );
}
