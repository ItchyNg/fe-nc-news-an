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
          <Link to={`/topics/${topic.slug}`}>
            <ol key={topic.slug} className="Indv_Topics">
              <p>{topic.slug}</p>
            </ol>{" "}
          </Link>
        ))}
      </ul>
    );
  }
}

export default DisplayTopics;
