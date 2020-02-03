import React from "react";
import * as api from "../api";

class DisplayArticles extends React.Component {
  state = {
    listOfArticles: []
  };

  componentDidMount() {
    api.getListOfArticles().then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }

  render() {
    const { listOfArticles } = this.state;
    return (
      <ul>
        {listOfArticles.map(articles => (
          <ol key={articles.title}>
            {articles.title} <button>*</button>
          </ol>
        ))}
      </ul>
    );
  }
}

export default DisplayArticles;
