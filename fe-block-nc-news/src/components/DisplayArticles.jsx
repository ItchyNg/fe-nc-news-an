import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

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
            {articles.title}
            <Link to={`/articles/${articles.article_id}`}>
              <button>*</button>
            </Link>
          </ol>
        ))}
      </ul>
    );
  }
}

export default DisplayArticles;
