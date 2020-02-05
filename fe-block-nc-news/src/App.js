import React from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import TopicsPage from "./components/TopicsPage";
import DisplayArticlesByTopics from "./components/DisplayArticlesByTopics";
import DisplayArticlesById from "./components/DisplayArticlesById";
import ErrorPage from "./ErrorPage";
import LoginPage from "./components/LoginPage";

class App extends React.Component {
  state = {
    username: "",
    viewLoginPage: false
  };

  loggedUser = user => {
    this.setState({ username: user });
  };

  render() {
    const { username, viewLoginPage } = this.state;
    return (
      <div className="App">
        <Header />
        {!username && (
          <div>
            <button
              onClick={() =>
                this.setState(currentState => {
                  return { viewLoginPage: !currentState.viewLoginPage };
                })
              }
            >
              Log In Here
            </button>
            {viewLoginPage && <LoginPage loggedUser={this.loggedUser} />}
          </div>
        )}
        {username && <p>Logged in as {username}</p>}
        <Navbar />
        <Router>
          <Homepage path="/" />
          <TopicsPage path="/topics" />
          <DisplayArticlesByTopics path="topics/:topic" />
          <DisplayArticlesById
            username={username}
            path="articles/:article_id"
          />
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <LoginPage />
//       <Navbar />
//       <Router>
//         <Homepage path="/" />
//         <TopicsPage path="/topics" />
//         <DisplayArticlesByTopics path="topics/:topic" />
//         <DisplayArticlesById path="articles/:article_id" />
//         <ErrorPage default />
//       </Router>
//     </div>
//   );
// }

export default App;
