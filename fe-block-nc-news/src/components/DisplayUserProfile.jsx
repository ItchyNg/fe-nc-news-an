import React from "react";
import * as api from "../api";

class DisplayUserProfile extends React.Component {
  state = { userInfo: "", userArticles: [], userComments: [] };

  componentDidMount() {
    const { username } = this.props;
    api.getUser(username).then(userInfo => this.setState({ userInfo }));

    api
      .getListOfArticles(username)
      .then(userArticles => this.setState({ userArticles }));

    api
      .getCommentsByUserId(username)
      .then(userComments => this.setState({ userComments }));
  }

  render() {
    const { userInfo, userArticles, userComments } = this.state;
    console.log(userArticles, "<<");
    return (
      <div>
        <img src={userInfo.avatar_url} alt="avatar"></img>
        <p>{userInfo.username}</p>
        {userArticles.map(article => (
          <section key={article.article_id}>
            <ol>{article.title}</ol>
          </section>
        ))}
        <p>comments</p>

        {userComments.map(comment => (
          <section key={comment.comment_id}>
            <li>{comment.body}</li>
          </section>
        ))}
      </div>
    );
  }
}

export default DisplayUserProfile;
