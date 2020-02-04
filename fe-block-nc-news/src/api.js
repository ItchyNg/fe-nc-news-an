import React from "react";
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
      `http://itch-nc-news-app.herokuapp.com/api/articles/${article_id}/comments?sort_by=votes&order=desc`,
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
