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
          {/*  */}
          <section className="Article_Title">
            <section className="Article_Title_Title">
              <h2 className="Article_Title_Header">{articleById.title}</h2>

              <p className="Article_Title_Author">
                Author: {articleById.author} || Created at{" "}
                {new Date(articleById.created_at).toLocaleString()}
              </p>
            </section>

            <p className="Article_Title_Likes">
              <AmendVotes
                username={username}
                voteNumber={articleById.votes}
                location="articles"
                comment_id={articleById.article_id}
              />
            </p>

            <label
              onClick={this.handleToggle}
              className="Article_Title_Commentbutton"
            >
              <button>View {articleById.comment_count} Comments</button>
            </label>
          </section>
          {/*  */}
          <section className="ListOfArticles_Articles_Body">
            <p className="putBorder">{articleById.body} </p>
          </section>
          <section className="Article_Comments">
            {this.state.viewToggler && (
              <DisplayComments
                username={username}
                article_id={articleById.article_id}
              />
            )}
          </section>
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
