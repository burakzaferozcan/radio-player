import React, { useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../withRouter";

const Sidebar = ({ location }) => {
  const [toggled, setToggled] = useState(false);
  const handleToggle = () => {
    setToggled(!toggled);
  };
  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          toggled ? "toggled" : ""
        }`}
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-text mx-3">Radio</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Link className="nav-link" to={"/"}>
            <i className="fas fa-fw fa-home"></i>
            <span>Anasayfa</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li
          className={`nav-item ${
            location.pathname === "/favourite" ? "active" : ""
          }`}
        >
          <Link className="nav-link" to={"/favourite"}>
            <i className="fas fa-fw fa-heart"></i>
            <span>Favoriler</span>
          </Link>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={handleToggle}
          ></button>
        </div>
      </ul>
    </>
  );
};

export default withRouter(Sidebar);
