import React from "react";
import * as api from "../api";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";

class DisplayComments extends React.Component {
  state = {
    commentsByArticleId: [],
    sortBy: null || "votes",
    orderBy: null || "desc",
    username: null || "jessjelly" //prob have to props this to addComments
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { sortBy, orderBy } = this.state;
    if (
      this.props !== prevProps ||
      this.state.orderBy !== prevState.orderBy ||
      this.state.sortBy !== prevState.sortBy
    ) {
      api
        .getCommentsByArticleId(this.props.article_id, sortBy, orderBy)
        .then(comments => this.setState({ commentsByArticleId: comments }));
    }
  }

  handleClick = event => {
    event.preventDefault();
    const sortByValue = event.target.name;
    const orderByValue = event.target.value;
    this.setState({ ["sortBy"]: sortByValue, ["orderBy"]: orderByValue });
  };

  addCommentToArray = newComment => {
    this.setState(currentState => {
      return {
        commentsByArticleId: [newComment, ...currentState.commentsByArticleId]
      };
    });
  };

  updateCommentsAfterDeletedComment = comment_id => {
    const { commentsByArticleId } = this.state; //filters through the array of comments to remove the one that was delete, then setState to re-render the page
    let updatedComments = commentsByArticleId.filter(
      comments => comments.comment_id !== comment_id
    );
    this.setState({ commentsByArticleId: updatedComments });
  };

  render() {
    const { commentsByArticleId, username } = this.state;
    console.log(commentsByArticleId);

    console.log(this.state.sortBy, this.state.orderBy, "<<<>>>><<");

    return (
      <div>
        <h3>Comments:</h3>
        <label onClick={this.handleClick}>
          <button name="created_at" value="asc">
            Newest
          </button>
          <button name="created_at" value="desc">
            Oldest
          </button>
          <button name="votes" value="desc">
            Most Popular
          </button>
          <button name="votes" value="asc">
            Least Popular
          </button>
        </label>

        {commentsByArticleId.map(comment => (
          <section key={comment.comment_id}>
            <p>
              Author: {comment.author} created: {comment.created_at}
            </p>
            <p>
              Body: {comment.body}{" "}
              {comment.author === username ? (
                <DeleteComment
                  comment_id={comment.comment_id}
                  updateCommentsAfterDeletedComment={
                    this.updateCommentsAfterDeletedComment
                  }
                />
              ) : null}
            </p>
            <p>Votes:{comment.votes}</p>
          </section>
        ))}

        <p>ADD A COMMENT</p>
        <AddComment
          article_id={this.props.article_id}
          addCommentToArray={this.addCommentToArray}
        />
      </div>
    );
  }
}

// const DisplayComments = props => {
//   console.log(props.article_id, "<<<<<<PROP");
//   return (
//     <div>
//       <h2>Display some comments here</h2>
//       {api.getCommentsByArticleId(props.article_id))}
//     </div>
//   );
// };

export default DisplayComments;
