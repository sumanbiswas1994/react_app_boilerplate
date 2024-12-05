import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Footer, Navbar, Sidebar } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />
        <main
          className="flex-grow-1 p-4"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Outlet /> {/* This renders the matched child route */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
