import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class DisplayArticles extends React.Component {
  state = {
    listOfArticles: [],
    sortBy: "",
    orderBy: "",
    sortByArray: [
      { date: "created_at" },
      { comments: "comment_count" },
      { votes: "votes" }
    ]
  };

  componentDidMount() {
    api.getListOfArticles().then(articles => {
      this.setState({ listOfArticles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, orderBy } = this.state;
    if (sortBy !== prevState.sortBy || orderBy !== prevState.orderBy) {
      api.getListOfArticles("", "", sortBy, orderBy).then(articles => {
        this.setState({ listOfArticles: articles });
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
    const { listOfArticles, sortByArray } = this.state;
    console.log(this.state.orderBy, this.state.sortBy);
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
          {listOfArticles.map(articles => (
            <ol key={articles.title}>
              <p>
                {articles.title} || written by {articles.author}
              </p>
              <p>
                Votes: {articles.votes} Comments:{articles.comment_count}{" "}
                Created:{articles.created_at}
              </p>
              <Link to={`/articles/${articles.article_id}`}>
                <button>View</button>
              </Link>
            </ol>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayArticles;
