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
      <button>
        <i
          className="far fa-times-circle"
          style={{ fontSize: "20px", color: "red" }}
        ></i>
      </button>
    </label>
  );
};
export default DeleteComment;
