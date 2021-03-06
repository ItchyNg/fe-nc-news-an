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
      { Date: "created_at" },
      { Votes: "votes" },
      { Comments: "comment_count" }
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

  rocket = () => {
    return (
      <div className="rockbody">
        <div className="rocket">
          <div className="rocket-body">
            <div className="body"></div>
            <div className="fin fin-left"></div>
            <div className="fin fin-right"></div>
            <div className="window"></div>
          </div>
          <div className="exhaust-flame"></div>
          <ul className="exhaust-fumes">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul className="star">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
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
          <section className="ListOfArticles_Right"> {this.rocket()}</section>

          <section className="ListOfArticles_SortBar">
            <select defaultValue="" name="sortBy" onClick={this.handleClick}>
              <option disabled value="">
                Sort By
              </option>
              {sortByArray.map(sortByColumns => (
                <option
                  value={Object.values(sortByColumns)}
                  name="sortBy"
                  key={Object.values(sortByColumns)}
                >
                  {Object.keys(sortByColumns)}
                </option>
              ))}
            </select>{" "}
            <label onClick={this.handleClick}>
              {" "}
              <button
                value="desc"
                name="orderBy"
                className="fa fa-angle-double-up"
                style={{ fontSize: "15px" }}
              ></button>{" "}
              <button
                value="asc"
                name="orderBy"
                className="fa fa-angle-double-down"
                style={{ fontSize: "15px" }}
              ></button>
            </label>
          </section>

          <section className="ListOfArticles_Articles">
            <ul>
              {articlesByTopic.map(articles => (
                <ol key={articles.title}>
                  <Link
                    to={`/articles/${articles.article_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <nav className="ListofArticles_Cards_Info">
                      <time>
                        Created:
                        {new Date(articles.created_at).toLocaleString()}
                      </time>
                      <h2>
                        <i className="far fa-thumbs-up"></i>
                        {articles.votes}
                      </h2>
                      <p>VIEW</p>
                    </nav>
                  </Link>

                  <section className="ListofArticles_Cards_Title">
                    <h1>{articles.title}</h1>
                    <h2>
                      <b>Author:</b>
                      <Link
                        to={`/user/${articles.author}`}
                        style={{ textDecoration: "none", color: "black" }}
                        username={articles.author}
                      >
                        {articles.author}
                      </Link>
                    </h2>

                    <p>
                      {articles.comment_count}
                      <i className="far fa-comment-alt"></i>
                    </p>
                  </section>
                </ol>
              ))}
            </ul>
          </section>
        </section>
      </div>
    );
  }
}

export default DisplayArticlesByTopics;
