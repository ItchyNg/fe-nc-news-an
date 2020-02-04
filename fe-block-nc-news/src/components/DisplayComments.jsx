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
    const keyToUpdate = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [keyToUpdate]: inputValue });
  };

  addCommentToArray = newComment => {
    this.setState(currentState => {
      return {
        commentsByArticleId: [newComment, ...currentState.commentsByArticleId]
      };
    });
  };

  render() {
    const { commentsByArticleId, username } = this.state;
    return (
      <div>
        <h3>Comments:</h3>
        <label onClick={this.handleClick}>
          <button>Newest</button>
          <button>Oldest</button>
          <button>Most Popular</button>
          <button>Least Popular</button>
        </label>
        {/* <label onClick={this.handleClick}>
          Order:
          <button value="asc" name="orderBy">
            ASC
          </button>
          <button value="desc" name="orderBy">
            DESC
          </button>
        </label>
        <label onClick={this.handleClick}>
          Sort By:
          <button value="votes" name="sortBy">
            Votes
          </button>
          <button value="created_at" name="sortBy">
            Date
          </button>
        </label> */}

        {commentsByArticleId.map(comment => (
          <section key={comment.comment_id}>
            <p>
              Author: {comment.author} created: {comment.created_at}
            </p>
            <p>
              {" "}
              Body: {comment.body}{" "}
              {comment.author === username ? <DeleteComment /> : null}
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
