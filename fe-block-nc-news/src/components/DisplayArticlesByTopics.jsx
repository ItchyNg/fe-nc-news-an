import React from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class DisplayArticlesByTopics extends React.Component {
  state = {
    articlesByTopic: []
  };

  componentDidMount() {
    const { topic } = this.props;
    api
      .getListOfArticles("", topic)
      .then(articles => this.setState({ articlesByTopic: articles }));
  }

  render() {
    const { articlesByTopic } = this.state;
    return (
      <ul>
        {articlesByTopic.map(article => (
          <li key={article.article_id}>
            {" "}
            <Link to={`/articles/${article.article_id}`}>
              {article.title} --- {article.topic}{" "}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

// const DisplayArticlesByTopics = props => {
//   const { topic } = props;
//   console.log(topic, "<<<props in topics articless");
//   return api.getListOfArticles("", topic).then(articles => {
//     console.log(articles, ">>>");
//     return (
//       <ul>
//         {articles.map(article => (
//           <li key={article.article_id}>{article.title}</li>
//         ))}
//       </ul>
//     );
//   });
// };

export default DisplayArticlesByTopics;
