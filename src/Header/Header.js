import React, { Component } from "react";
import { BiHomeAlt2 } from "react-icons/bi";

export default class extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <BiHomeAlt2 />
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="./Density">
                  Density <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./GDP">
                  GDP
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Population By Age
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Population By Sex
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
