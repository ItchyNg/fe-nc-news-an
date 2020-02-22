import axios from "axios";

export const getListOfTopics = () => {
  return axios
    .get("https://itch-nc-news-app.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getListOfArticles = (author, topic, sort_by, order) => {
  return axios
    .get("https://itch-nc-news-app.herokuapp.com/api/articles", {
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
    .get(`https://itch-nc-news-app.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsByArticleId = (article_id, sort_by, order) => {
  return axios
    .get(
      `https://itch-nc-news-app.herokuapp.com/api/articles/${article_id}/comments`,
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
      `https://itch-nc-news-app.herokuapp.com/api/articles/${article_id}/comments`,
      input
    )
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = comment_id => {
  return axios.delete(
    `https://itch-nc-news-app.herokuapp.com/api/comments/${comment_id}`
  );
};

export const patchVote = (location, id, input) => {
  return axios
    .patch(
      `https://itch-nc-news-app.herokuapp.com/api/${location}/${id}`,
      input
    )
    .then(({ data }) => {
      return data;
    });
};

export const getUser = username => {
  return axios
    .get(`https://itch-nc-news-app.herokuapp.com/api/users/${username}`)
    .then(({ data }) => {
      return data.user;
    });
};

export const getCommentsByUserId = username => {
  return axios
    .get(`https://itch-nc-news-app.herokuapp.com/api/comments/user/${username}`)
    .then(({ data }) => {
      return data.comments;
    });
};
