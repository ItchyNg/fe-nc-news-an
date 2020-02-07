import React from "react";
import * as api from "../api";

const DeleteComment = props => {
  return (
    <label
      onClick={() => {
        api.deleteComment(props.comment_id); // does not wait until the server returns anything before updating the comment list..., should add an error if the delete returns an error...
        props.updateCommentsAfterDeletedComment(props.comment_id);
      }}
    >
      <button>
        <i
          class="far fa-times-circle"
          style={{ fontSize: "20px", color: "red" }}
        ></i>
      </button>
    </label>
  );
};
export default DeleteComment;
