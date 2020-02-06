import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import ErrorPage from "../ErrorPage";

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
    isLoading: true,
    err: null
  };

  componentDidMount() {
    const { topic } = this.props;
    api
      .getListOfArticles("", topic)
      .then(articles =>
        this.setState({ articlesByTopic: articles, isLoading: false })
      )
      .catch(err => {
        this.setState({
          err: { response: { status: "404", statusText: "Topic Not Found" } }
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, orderBy } = this.state;
    const { topic } = this.props;
    if (sortBy !== prevState.sortBy || orderBy !== prevState.orderBy) {
      api
        .getListOfArticles("", topic, sortBy, orderBy)
        .then(articles => {
          this.setState({ articlesByTopic: articles });
        })
        .catch(err => {
          this.setState({ err });
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
    const { articlesByTopic, isLoading, sortByArray, err } = this.state;
    if (err) {
      return <ErrorPage err={err} />;
    }
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <section className="ListOfArticles_Container">
          <section className="ListOfArticles_SortBar">
            <label onClick={this.handleClick}>
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
          </section>
          <section className="ListOfArticles_Articles">
            <ul>
              {articlesByTopic.map(articles => (
                <ol key={articles.title} className="ListOfArticles_Cards">
                  <p className="putBorder">
                    {articles.title} || written by {articles.author}
                  </p>
                  <p className="putBorder">
                    Votes: {articles.votes} Comments:{articles.comment_count}{" "}
                    Created:{new Date(articles.created_at).toLocaleString()}
                  </p>
                  <Link to={`/articles/${articles.article_id}`}>
                    <button className="putBorder">View {articles.topic}</button>
                  </Link>
                </ol>
              ))}
            </ul>
          </section>
        </section>
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
