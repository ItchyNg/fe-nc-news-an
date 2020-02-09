import React from "react";
import { Link } from "@reach/router";

export const Navbar = () => {
  return (
    <ul>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <ol> Home </ol>
      </Link>

      <Link to="/topics" style={{ textDecoration: "none", color: "white" }}>
        <ol> Topics </ol>
      </Link>
    </ul>
  );
};

export default Navbar;
