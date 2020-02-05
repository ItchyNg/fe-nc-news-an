import React from "react";
import * as api from "../api";

class AmendVote extends React.Component {
  state = {
    voteChange: 0,
    upVote: false,
    downVote: false
  };

  handleClick = (change, type, type2) => {
    const { location, comment_id } = this.props;

    this.setState(
      currentState => {
        return {
          voteChange: currentState.voteChange + change,
          [type2]: currentState.type,
          [type]: !currentState.type2
        };
      },
      () => {
        api.patchVote(location, comment_id, {
          inc_votes: change
        });
      }
    );
  };

  render() {
    const { voteNumber, username } = this.props;
    const { voteChange, upVote, downVote } = this.state;
    if (username) {
      return (
        <section>
          <button
            onClick={() => this.handleClick(1, "upVote", "downVote")}
            disabled={upVote}
          >
            ^
          </button>
          <p>Likes: {voteNumber + voteChange}</p>
          <button
            onClick={() => this.handleClick(-1, "downVote", "upVote")}
            disabled={downVote}
          >
            v
          </button>
        </section>
      );
    }
    return <p>Likes: {voteNumber + voteChange}</p>;
  }
}

export default AmendVote;
