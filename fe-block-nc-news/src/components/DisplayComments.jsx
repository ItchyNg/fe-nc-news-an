import React from "react";
import * as api from "../api";

class DisplayComments extends React.Component {
  state = {
    commentsByArticleId: []
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      api
        .getCommentsByArticleId(this.props.article_id)
        .then(comments => this.setState({ commentsByArticleId: comments }));
    }
  }
  render() {
    const { commentsByArticleId } = this.state;
    console.log(commentsByArticleId);
    return (
      <div>
        <h3>Comments:</h3>
        <ul>
          {commentsByArticleId.map(comment => (
            <ol key={comment.comment_id}>
              <p>Author: {comment.author} </p>
              <p> Body: {comment.body} </p>
              <p>Votes:{comment.votes}</p>
            </ol>
          ))}
        </ul>
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
