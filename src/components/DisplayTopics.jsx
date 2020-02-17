import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class DisplayTopics extends React.Component {
  state = {
    listOfTopics: [],
    isLoading: true
  };

  componentDidMount() {
    api.getListOfTopics().then(topics => {
      this.setState({ listOfTopics: topics, isLoading: false });
    });
  }
  render() {
    const { listOfTopics, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <ul className="ListTopics">
        {listOfTopics.map(topic => (
          <section key={topic.slug}>
            <Link
              to={`/topics/${topic.slug}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <ol className="Indv_Topics">
                <p>{topic.slug.toUpperCase()}</p>
              </ol>{" "}
            </Link>
          </section>
        ))}
      </ul>
    );
  }
}

export default DisplayTopics;
