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
        className="button text-white">
        Home
      </button>
      <button
        onClick={() => {
          navigate("/Density");
        }}
        className="button text-white">
        Population
      </button>
      <button
        onClick={() => {
          navigate("/GDP");
        }}
        className="button text-white">
        GDP
      </button>
      <button
        onClick={() => {
          navigate("/Diploma");
        }}
        className="button text-white">
        Diploma
      </button>
    </div>
  );
}
