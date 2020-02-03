import React from "react";
import * as api from "../api";

class DisplayArticlesById extends React.Component {
  state = { articleById: [] };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleById(article_id)
      .then(article => this.setState({ articleById: article }));
  }

  render() {
    const { articleById } = this.state;
    console.log(this.state.articleById);
    return (
      <div>
        <h3>
          {articleById.title} {articleById.votes}
        </h3>
        <p>
          Author: {articleById.author} || Created at {articleById.created_at}
        </p>
        <main>{articleById.body} </main>
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
