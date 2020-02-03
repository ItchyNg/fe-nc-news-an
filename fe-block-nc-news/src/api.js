import React from "react";
import axios from "axios";

export const getListOfTopics = () => {
  return axios
    .get("http://itch-nc-news-app.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getListOfArticles = () => {
  return axios
    .get("http://itch-nc-news-app.herokuapp.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
};
// "queries": [
//   "author",
//   "topic",
//   "sort_by",
//   "order"
// ],
