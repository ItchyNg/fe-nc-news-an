import React from "react";
import DisplayTopics from "./DisplayTopics";

const TopicsPage = () => {
  return (
    <div>
      <section className="TopicsPage_Container">
        <header className="putBorder">
          <h2>Topic</h2>
        </header>
        <section className="putBorder">
          <DisplayTopics />
        </section>
      </section>
    </div>
  );
};

export default TopicsPage;
