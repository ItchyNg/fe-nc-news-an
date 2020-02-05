import React from "react";

class Login extends React.Component {
  state = {
    username: "",
    arrayOfUsers: [
      "tickle122",
      "grumpy19",
      "happyamy2016",
      "cooljmessy",
      "weegembump",
      "jessjelly"
    ]
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({ username: event.target.value }, () => {
      this.props.loggedUser(this.state.username);
    });
  };

  render() {
    const { arrayOfUsers } = this.state;
    console.log(this.state.username, "<<<");
    return (
      <div>
        Choose user to login with:
        <select defaultValue="" onClick={this.handleClick}>
          <option disabled value="">
            username
          </option>
          {arrayOfUsers.map(user => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
    );
  }
  // if (!viewLoginPage) {
  //     return (

  //     );
  //   }

  //   const { username, arrayOfUsers } = this.state;
  //   return (
  //     <div>
  //       You are logged in as:
  //       <select>
  //         <option>tickle122</option>
  //         <option>grumpy19</option>
  //         <option>3</option>
  //       </select>
  //     </div>
  //   );
  // }
}

export default Login;
