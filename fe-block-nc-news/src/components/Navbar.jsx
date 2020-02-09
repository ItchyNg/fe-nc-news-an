import React from "react";
import { Link } from "@reach/router";

export const Navbar = () => {
  return (
    <ul>
      <ol>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </ol>

      <ol>
        <Link to="/topics" style={{ textDecoration: "none", color: "white" }}>
          Topics
        </Link>
      </ol>
    </ul>
  );
};

export default Navbar;
