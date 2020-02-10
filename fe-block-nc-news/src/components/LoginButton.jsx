import React from "react";
import LoginPage from "./LoginPage";

class LoginButton extends React.Component {
  state = {
    viewLoginPage: false
  };

  handleClick = () => {
    this.setState(currentState => {
      return { viewLoginPage: !currentState.viewLoginPage };
    });
  };
  render() {
    const { user } = this.props;
    const { viewLoginPage } = this.state;
    return (
      <section>
        {!user && (
          <div>
            <button onClick={this.handleClick}>Log In Here</button>
            {viewLoginPage && <LoginPage loggedUser={this.loggedUser} />}
          </div>
        )}
        {user && (
          <p>
            Welcome Back {user.username}!
            <button
              onClick={() => {
                return this.loggedUser("") & this.handleClick();
              }}
            >
              LOGOUT
            </button>{" "}
            <img src={user.avatar_url} alt="avatar"></img>
          </p>
        )}
      </section>
    );
  }
}

export default LoginButton;
