import React from "react";
import * as api from "../api";
import DisplayComments from "./DisplayComments";
import AmendVotes from "./AmendVotes";
import ErrorPage from "../ErrorPage";
import { Link } from "@reach/router";

class DisplayArticlesById extends React.Component {
  state = {
    articleById: [],
    isLoading: true,
    viewToggler: false,
    err: null
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleById(article_id)
      .then(article =>
        this.setState({ articleById: article, isLoading: false })
      )
      .catch(err => {
        this.setState({
          err: {
            response: {
              status: err.response.status,
              statusText: "Article Not Found"
            }
          }
        });
      });
  }

  handleToggle = event => {
    event.preventDefault();
    this.setState(currentState => {
      return {
        viewToggler: !currentState.viewToggler
      };
    });
  };

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

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
    const { articleById, isLoading, err } = this.state;
    const { username } = this.props;
    if (err) {
      return <ErrorPage err={err} />;
    }
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <section className="Article_Container">
          <div className="Article_Right">{this.rocket()}</div>
          <section className="Article_Title">
            <h2>{articleById.title}</h2>
            <Link
              to={`/user/${articleById.author}`}
              style={{ textDecoration: "none", color: "white" }}
              username={articleById.author}
            >
              <p>
                {articleById.author}
                || {new Date(articleById.created_at).toLocaleString()}
              </p>{" "}
            </Link>
            <section>
              <AmendVotes
                username={username}
                voteNumber={articleById.votes}
                location="articles"
                comment_id={articleById.article_id}
              />
            </section>
            <label onClick={this.handleToggle}>
              <i className="far fa-comment-alt"> {articleById.comment_count}</i>
            </label>
          </section>
          <section className="Article_Body">
            <p>
              <span style={{ fontSize: "40px" }}>{articleById.body[0]} </span>
              {articleById.body.slice(1)}
            </p>
          </section>
          <section className="Article_Comments">
            {this.state.viewToggler && (
              <DisplayComments
                username={username}
                article_id={articleById.article_id}
                scrollToTop={this.scrollToTop}
              />
            )}
          </section>{" "}
        </section>
      </div>
    );
  }
}

export default DisplayArticlesById;
