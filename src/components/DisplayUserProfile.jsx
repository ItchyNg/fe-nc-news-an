import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

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
    console.log(userComments, "<<");
    return (
      <div className="UserInfo_Container">
        <h1>{userInfo.username}</h1>
        <img
          src={userInfo.avatar_url}
          alt={`avatar ${userInfo.username}`}
        ></img>

        <h2>ARTICLES</h2>
        {userArticles.map(article => (
          <Link
            to={`/articles/${article.article_id}`}
            key={article.article_id}
            className="UserInfo_Articles"
          >
            <section>
              <h2>{article.title}</h2>
              <p>
                {article.author} ||
                <time>
                  Posted {new Date(article.created_at).toLocaleString()}
                </time>
              </p>
              <p>
                Votes {article.votes} || Comments {article.comment_count}
              </p>
            </section>
          </Link>
        ))}

        {/* <h3>comments</h3> */}
        {/* {userComments.map(comment => (
          <section key={comment.comment_id}>
            <li>{comment.body}</li>
          </section>
        ))} */}
      </div>
    );
  }
}

export default DisplayUserProfile;
