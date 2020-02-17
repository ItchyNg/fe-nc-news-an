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
        <div>
          <section className="Button_Container">
            <p>
              <i
                className="fas fa-heart"
                style={{ fontSize: "25px", color: " #ce6458" }}
              >
                {" "}
                {voteNumber + voteChange}
              </i>
            </p>
            <button
              onClick={() => this.handleClick(1, "upVote", "downVote")}
              disabled={upVote}
            >
              <i className="far fa-thumbs-up" style={{ fontSize: "10px" }}></i>
            </button>

            <button
              onClick={() => this.handleClick(-1, "downVote", "upVote")}
              disabled={downVote}
            >
              <i
                className="fa fa-thumbs-o-down"
                style={{ fontSize: "10px" }}
              ></i>
            </button>
          </section>
        </div>
      );
    }
    return (
      <p>
        <i
          className="fas fa-heart"
          style={{ fontSize: "25px", color: " #ce6458" }}
        >
          {" "}
          {voteNumber + voteChange}
        </i>
      </p>
    );
  }
}

export default AmendVote;
