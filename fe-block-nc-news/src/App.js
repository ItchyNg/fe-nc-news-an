import React from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import TopicsPage from "./components/TopicsPage";
import DisplayArticlesByTopics from "./components/DisplayArticlesByTopics";
import DisplayArticlesById from "./components/DisplayArticlesById";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Router>
        <Homepage path="/" />
        <TopicsPage path="/topics" />
        <DisplayArticlesByTopics path="topics/:topic" />
        <DisplayArticlesById path="articles/:article_id" />
        <ErrorPage default />
      </Router>
    </div>
  );
}

export default App;
