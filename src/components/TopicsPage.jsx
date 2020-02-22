import React from "react";
import DisplayTopics from "./DisplayTopics";

const TopicsPage = () => {
  return (
    <div>
      <section className="TopicsPage_Container">
        <header>
          <h2>Topic</h2>
        </header>
        <section>
          <DisplayTopics />
        </section>
      </section>
    </div>
  );
};

export default TopicsPage;
