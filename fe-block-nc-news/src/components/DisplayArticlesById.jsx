import React from "react";
import * as api from "../api";
import DisplayComments from "./DisplayComments";
import AmendVotes from "./AmendVotes";
import ErrorPage from "../ErrorPage";

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
          <p className="Article_Right"></p>
          <section className="Article_Title">
            <h2>{articleById.title}</h2>
            <p>
              {articleById.author} ||{" "}
              {new Date(articleById.created_at).toLocaleString()}
            </p>
            <section>
              <AmendVotes
                username={username}
                voteNumber={articleById.votes}
                location="articles"
                comment_id={articleById.article_id}
              />
            </section>
            <label onClick={this.handleToggle}>
              {articleById.comment_count} <i className="far fa-comment-alt"></i>
            </label>
          </section>
          <section className="Article_Body">
            <p>{articleById.body} </p>
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

// const DisplayArticlesById = props => {
//   const { article_id } = props;
//   console.log(props.article_id);
//   return api.getArticleById(article_id).then(res => {
//     console.log(res.body);
//     return <p>{res.body}</p>;
//   });
// };

export default DisplayArticlesById;
