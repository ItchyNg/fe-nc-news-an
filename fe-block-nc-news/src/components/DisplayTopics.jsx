import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class DisplayTopics extends React.Component {
  state = {
    listOfTopics: []
  };

  componentDidMount() {
    api.getListOfTopics().then(topics => {
      this.setState({ listOfTopics: topics });
    });
  }
  render() {
    const { listOfTopics } = this.state;

    return (
      <ul>
        {listOfTopics.map(topic => (
          <ol key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>
              <button>{topic.slug}</button>
            </Link>
          </ol>
        ))}
      </ul>
    );
  }
}

export default DisplayTopics;
