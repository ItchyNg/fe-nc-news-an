import React from "react";
import * as api from "../api";

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
          <li key={topic.slug}>{topic.slug}</li>
        ))}
      </ul>
    );
  }
}

export default DisplayTopics;
