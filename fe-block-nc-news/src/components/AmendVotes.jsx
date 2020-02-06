import React from "react";
import * as api from "../api";

class AmendVote extends React.Component {
  state = {
    voteChange: null,
    upVote: false,
    downVote: false
  };

  handleClick = (change, type, type2) => {
    const { location, comment_id } = this.props;
    const { upVote, downVote } = this.state;

    if (upVote !== downVote) {
      this.setState(
        { upVote: false, downVote: false, voteChange: null },
        () => {
          api.patchVote(location, comment_id, {
            inc_votes: change
          });
        }
      );
    } else {
      this.setState(
        currentState => {
          return {
            voteChange: currentState.voteChange + change,

            [type2]: currentState.type,
            //when you are logged in a vote comment, then sortby it adds another
            [type]: !currentState.type2
          };
        },
        () => {
          api.patchVote(location, comment_id, {
            inc_votes: change
          });
        }
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.setState(currentState => {
        return {
          voteChange: currentState.voteChange,
          upVote: false,
          downVote: false
        };
      });
    }
  }

  render() {
    const { voteNumber, username } = this.props;
    const { voteChange, upVote, downVote } = this.state;
    if (username) {
      return (
        <section className="Button_Container">
          <p>Likes: {voteNumber + voteChange}</p>
          <button
            onClick={() => this.handleClick(1, "upVote", "downVote")}
            disabled={upVote}
          >
            ^
          </button>

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
