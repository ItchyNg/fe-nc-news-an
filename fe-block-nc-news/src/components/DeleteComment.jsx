import React from "react";
import * as api from "../api";

const DeleteComment = props => {
  return (
    <label
      onClick={() => {
        api.deleteComment(props.comment_id);
        props.updateCommentsAfterDeletedComment(props.comment_id);
      }}
    >
      <button>DELETE</button>;
    </label>
  );
};
export default DeleteComment;
