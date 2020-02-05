//accepts an object with {username: "example" body: "insert text"}

import React from "react";
import * as api from "../api";

class AddComment extends React.Component {
  state = {
    username: null || "jessjelly",
    body: ""
  };

  // componentDidMount() {
  //   this.setState({ name: "" });
  // }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    const { username, body } = this.state;
    event.preventDefault();
    api
      .postAnItem(this.props.article_id, { username, body })
      .then(newComment => {
        this.props.addCommentToArray(newComment);
        this.setState({ body: "" });
      });
  };

  render() {
    const { username, body } = this.state;
    if (!username) {
      return <p>Please Log in!</p>;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {username}:
          <input
            required
            type="text"
            value={body}
            onChange={event => this.handleChange(event.target.value, "body")}
          />
        </label>
        <button>Add comment</button>
      </form>
    );
  }
}

export default AddComment;
