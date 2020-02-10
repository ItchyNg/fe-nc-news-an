import React from "react";
// import DisplayArticles from "./DisplayArticles";
import DisplayArticlesByTopics from "./DisplayArticlesByTopics";

const Homepage = () => {
  return (
    <div>
      <header>
        <h2>The Most Important News on Earth!</h2>
      </header>
      <DisplayArticlesByTopics />
    </div>
  );
};

export default Homepage;
