import React from "react";
import { Link } from "@reach/router";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
      </nav>
    </div>
  );
};

export default Navbar;
