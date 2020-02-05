import React from "react";
import * as api from "../api";
import DisplayComments from "./DisplayComments";

class DisplayArticlesById extends React.Component {
  state = {
    articleById: [],
    isLoading: true,
    viewToggler: false
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleById(article_id)
      .then(article =>
        this.setState({ articleById: article, isLoading: false })
      );
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
    const { articleById, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h3>{articleById.title}</h3>
        <section>
          <h4>liked by: {articleById.votes} </h4>
          <p>
            Author: {articleById.author} || Created at {articleById.created_at}
          </p>
          <p>{articleById.body} </p>
        </section>

        <label onClick={this.handleToggle}>
          <button>View {articleById.comment_count} Comments</button>
        </label>

        {this.state.viewToggler && (
          <DisplayComments article_id={articleById.article_id} />
        )}
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
