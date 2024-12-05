import React from "react";
import { Link } from "react-router-dom";

export default function Pagenotfound() {
    return (
        <div className="container text-center mt-5">
          <h1>404 - Page Not Found</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      );
}
