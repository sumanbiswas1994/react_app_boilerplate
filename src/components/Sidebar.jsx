import React, { useState } from "react";
import {NavLink } from "react-router-dom";
function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      style={{
        width: isCollapsed ? "70px" : "250px",
        height: "100vh",
        backgroundColor: "#28a745",
        color: "white",
        transition: "width 0.3s ease",
        overflow: "hidden", 
      }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="btn btn-outline-light m-2 d-flex justify-content-center align-items-center"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "white",
          color: "green",
          border: "none",
        }}
      >
        {isCollapsed ? (
          <i className="bi bi-list"></i> 
        ) : (
          <i className="bi bi-x-lg"></i> 
        )}
      </button>
      <ul style={{ fontFamily: "Quicksand" }} className="nav flex-column p-2">
        <li className="nav-item">
          <NavLink
            to={"/dashboard"}
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {!isCollapsed && "Dashboard"}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/user"}
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="bi bi-people-fill me-2"></i>
            {!isCollapsed && "Users"}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/report"}
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="bi bi-bar-chart-fill me-2"></i>
            {!isCollapsed && "Reports"}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/setting"}
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="bi bi-gear-fill me-2"></i>
            {!isCollapsed && "Settings"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
