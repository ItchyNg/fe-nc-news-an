import axios from "axios";

export const getListOfTopics = () => {
  return axios
    .get("http://itch-nc-news-app.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getListOfArticles = (author, topic, sort_by, order) => {
  return axios
    .get("http://itch-nc-news-app.herokuapp.com/api/articles", {
      params: {
        author: author,
        topic: topic,
        sort_by: sort_by,
        order: order
      }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = article_id => {
  return axios
    .get(`http://itch-nc-news-app.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsByArticleId = (article_id, sort_by, order) => {
  return axios
    .get(
      `http://itch-nc-news-app.herokuapp.com/api/articles/${article_id}/comments`,
      {
        params: {
          sort_by: sort_by,
          order: order
        }
      }
    )
    .then(({ data }) => {
      return data.comments;
    });
};

export const postAnItem = (article_id, input) => {
  return axios
    .post(
      `http://itch-nc-news-app.herokuapp.com/api/articles/${article_id}/comments`,
      input
    )
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = comment_id => {
  return axios.delete(
    `http://itch-nc-news-app.herokuapp.com/api/comments/${comment_id}`
  ); //should have a then and return item to check if successful??
};

export const patchVote = (location, id, input) => {
  //comments or articles for location
  console.log(location, id, input);
  return axios
    .patch(`http://itch-nc-news-app.herokuapp.com/api/${location}/${id}`, input)
    .then(({ data }) => {
      console.log(data, "<<<< data");
      return data;
    });
};
