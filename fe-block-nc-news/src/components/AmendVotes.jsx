import React from "react";

class AmendVote extends React.Component {
  state = {
    voteChange: 0,
    upVote: false,
    downVote: false
  };

  handleClick = (change, type, type2) => {
    this.setState(currentState => {
      return {
        voteChange: currentState.voteChange + change,
        [type2]: currentState.type,
        [type]: !currentState.type2
      };
    });
  };

  render() {
    const { voteNumber } = this.props;
    const { voteChange, upVote, downVote } = this.state;

    console.log(voteChange);
    return (
      <section>
        <button
          onClick={() => this.handleClick(1, "upVote", "downVote")}
          disabled={upVote}
        >
          ^
        </button>
        <p>Votes:{voteNumber + voteChange}</p>
        <button
          onClick={() => this.handleClick(-1, "downVote", "upVote")}
          disabled={downVote}
        >
          v
        </button>
      </section>
    );
  }
}

export default AmendVote;
