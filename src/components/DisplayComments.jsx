import React from "react";
import * as api from "../api";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import AmendVotes from "./AmendVotes";
import { Link } from "@reach/router";

class DisplayComments extends React.Component {
  state = {
    commentsByArticleId: [],
    sortBy: null || "votes",
    orderBy: null || "desc",
    isLoading: true,
    viewToggler: false
  };

  componentDidMount() {
    const { sortBy, orderBy } = this.state;
    api
      .getCommentsByArticleId(this.props.article_id, sortBy, orderBy)
      .then(comments =>
        this.setState({ commentsByArticleId: comments, isLoading: false })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, orderBy } = this.state;
    const { article_id } = this.props;
    if (
      this.props.article_id !== prevProps.article_id ||
      this.state.orderBy !== prevState.orderBy ||
      this.state.sortBy !== prevState.sortBy
    ) {
      api
        .getCommentsByArticleId(article_id, sortBy, orderBy)
        .then(comments => this.setState({ commentsByArticleId: comments }));
    }
  }

  handleClick = event => {
    event.preventDefault();
    const sortByValue = event.target.name;
    const orderByValue = event.target.value;
    this.setState({ sortBy: sortByValue, orderBy: orderByValue });
  };

  addCommentToArray = newComment => {
    this.setState(currentState => {
      return {
        commentsByArticleId: [newComment, ...currentState.commentsByArticleId]
      };
    });
  };

  updateCommentsAfterDeletedComment = comment_id => {
    const { commentsByArticleId } = this.state;
    let updatedComments = commentsByArticleId.filter(
      comments => comments.comment_id !== comment_id
    );
    this.setState({ commentsByArticleId: updatedComments });
  };

  handleToggle = event => {
    event.preventDefault();
    this.setState(currentState => {
      return {
        viewToggler: !currentState.viewToggler
      };
    });
  };

  render() {
    const { commentsByArticleId, isLoading } = this.state;
    const { username } = this.props;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        {" "}
        <section className="Comments_Top">
          <label onClick={this.handleToggle}>
            <button>ADD A COMMENT</button>
          </label>
          {this.state.viewToggler && (
            <AddComment
              scrollToTop={this.props.scrollToTop}
              username={username}
              article_id={this.props.article_id}
              addCommentToArray={this.addCommentToArray}
            />
          )}

          <h3>Comments:</h3>
          <label onClick={this.handleClick}>
            <button name="created_at" value="desc">
              Newest
            </button>
            <button name="created_at" value="asc">
              Oldest
            </button>
            <button name="votes" value="desc">
              Most Popular
            </button>
            <button name="votes" value="asc">
              Least Popular
            </button>
          </label>
        </section>
        {commentsByArticleId.map(comment => (
          <section key={comment.comment_id} className="Comments_Card">
            <h3>
              <Link
                to={`/user/${comment.author}`}
                style={{ textDecoration: "none", color: "black" }}
                username={comment.author}
              >
                {comment.author === username ? "You" : comment.author} ||
              </Link>
              <time>
                Posted: {new Date(comment.created_at).toLocaleString()}
              </time>
            </h3>
            <p>
              Body: {comment.body}
              {comment.author === username ? (
                <DeleteComment
                  comment_id={comment.comment_id}
                  updateCommentsAfterDeletedComment={
                    this.updateCommentsAfterDeletedComment
                  }
                />
              ) : null}
            </p>
            <AmendVotes
              username={username}
              voteNumber={comment.votes}
              location="comments"
              comment_id={comment.comment_id}
            />
          </section>
        ))}
      </div>
    );
  }
}

export default DisplayComments;
