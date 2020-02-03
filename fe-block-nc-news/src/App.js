import React from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import DisplayArticles from "./components/DisplayArticles";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import TopicsPage from "./components/TopicsPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Router>
        <Homepage path="/" />
        <TopicsPage path="/topics" />
      </Router>
    </div>
  );
}

export default App;
