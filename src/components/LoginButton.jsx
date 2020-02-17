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
    const { user, loggedUser } = this.props;
    const { viewLoginPage } = this.state;
    return (
      <section>
        {!user && (
          <div>
            <button onClick={this.handleClick}>Log In Here</button>
            {viewLoginPage && <LoginPage loggedUser={loggedUser} />}
          </div>
        )}
        {user && (
          <p>
            Welcome Back {user.username}!
            <button
              onClick={() => {
                return loggedUser("") & this.handleClick();
              }}
            >
              LOGOUT
            </button>{" "}
          </p>
        )}
      </section>
    );
  }
}

export default LoginButton;
