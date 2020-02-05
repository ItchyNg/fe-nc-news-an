import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class DisplayArticlesByTopics extends React.Component {
  state = {
    articlesByTopic: [],
    sortBy: "",
    orderBy: "",
    topics: this.props.topics || "",
    sortByArray: [
      { date: "created_at" },
      { comments: "comment_count" },
      { votes: "votes" }
    ],
    isLoading: true
  };

  componentDidMount() {
    const { topic } = this.props;
    api
      .getListOfArticles("", topic)
      .then(articles =>
        this.setState({ articlesByTopic: articles, isLoading: false })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, orderBy } = this.state;
    const { topic } = this.props;
    if (sortBy !== prevState.sortBy || orderBy !== prevState.orderBy) {
      api.getListOfArticles("", topic, sortBy, orderBy).then(articles => {
        this.setState({ articlesByTopic: articles });
      });
    }
  }

  handleClick = event => {
    event.preventDefault();
    const keyToUpdate = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [keyToUpdate]: inputValue });
  };

  render() {
    const { articlesByTopic, isLoading, sortByArray } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <label onClick={this.handleClick}>
          {/*Makes buttons for sortBy*/}
          Sort By:
          {sortByArray.map(sortByColumns => (
            <button
              value={Object.values(sortByColumns)}
              name="sortBy"
              key={Object.values(sortByColumns)}
            >
              {Object.keys(sortByColumns)}
            </button>
          ))}
        </label>
        <label onClick={this.handleClick}>
          Order:
          <button value="asc" name="orderBy">
            ASC
          </button>
          <button value="desc" name="orderBy">
            DESC
          </button>
        </label>
        <ul>
          {articlesByTopic.map(article => (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title} --- {article.topic}{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// const DisplayArticlesByTopics = props => {
//   const { topic } = props;
//   console.log(topic, "<<<props in topics articless");
//   return api.getListOfArticles("", topic).then(articles => {
//     console.log(articles, ">>>");
//     return (
//       <ul>
//         {articles.map(article => (
//           <li key={article.article_id}>{article.title}</li>
//         ))}
//       </ul>
//     );
//   });
// };

export default DisplayArticlesByTopics;
