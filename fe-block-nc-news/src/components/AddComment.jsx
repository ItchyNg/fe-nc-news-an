//accepts an object with {username: "example" body: "insert text"}

import React from "react";
import * as api from "../api";

class AddComment extends React.Component {
  state = {
    body: ""
  };

  // componentDidMount() {
  //   this.setState({ name: "" });
  // }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    const { body } = this.state;
    const { username } = this.props;
    event.preventDefault();
    api
      .postAnItem(this.props.article_id, { username, body })
      .then(newComment => {
        this.props.addCommentToArray(newComment); // we are posting the item first then when this has been successful we will update what the user sees on the page by adding the omment to the array of comments.
        this.setState({ body: "" });
      });
  };

  render() {
    const { body } = this.state;
    const { username } = this.props;
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
