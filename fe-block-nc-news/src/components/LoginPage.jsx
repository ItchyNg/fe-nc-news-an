import React from "react";
import * as api from "../api";
import ErrorPage from "../ErrorPage";

class Login extends React.Component {
  state = {
    arrayOfUsers: [
      "tickle122",
      "grumpy19",
      "happyamy2016",
      "cooljmessy",
      "weegembump",
      "jessjelly",
      "NOTAUSERNAME"
    ],
    err: null
  };

  handleChange = event => {
    event.preventDefault();

    api
      .getUser(event.target.value)
      .then(user => this.props.loggedUser(user))
      .catch(err => {
        this.setState({
          err: {
            response: {
              status: err.response.status,
              statusText: "User Not Found"
            }
          }
        });
      });

    // this.setState({ username: event.target.value }, () => {
    //   this.props.loggedUser(this.state.username);
    // });
  };

  render() {
    const { arrayOfUsers, err } = this.state;
    if (err) {
      return <ErrorPage err={err} />;
    }
    return (
      <div>
        Choose user to login as:
        <select defaultValue="" onChange={this.handleChange}>
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
}

export default Login;
