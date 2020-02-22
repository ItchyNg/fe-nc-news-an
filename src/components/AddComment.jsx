import React from "react";
import * as api from "../api";

class AddComment extends React.Component {
  state = {
    body: "",
    msg: ""
  };

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
        this.props.addCommentToArray(newComment);
        this.setState({ body: "", msg: "Comment Submitted" });
        setTimeout(() => this.setState({ msg: "" }), 5000);
      });
  };

  render() {
    const { body, msg } = this.state;
    const { username } = this.props;
    if (msg) {
      return <p>{msg}</p>;
    }
    if (!username) {
      return (
        <div>
          <p>Please Log in!</p>
          {this.props.scrollToTop()}
        </div>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {username}:
          <input
            required
            type="textarea"
            value={body}
            onChange={event => this.handleChange(event.target.value, "body")}
          />
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

export default AddComment;
