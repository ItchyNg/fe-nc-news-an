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
import { Link } from "@reach/router";

class App extends React.Component {
  state = {
    username: "",
    viewLoginPage: false
  };

  loggedUser = user => {
    this.setState({ username: user });
  };

  handleClick = () => {
    this.setState(currentState => {
      return { viewLoginPage: !currentState.viewLoginPage };
    });
  };

  render() {
    const { username, viewLoginPage } = this.state;
    return (
      <div className="App">
        <section className="App_Top_Container">
          <Link to="/">
            <header>
              <Header />
            </header>
          </Link>

          <section className="App_Top_LoginButton_Container">
            {/* <p className="bottomm"></p> */}
            <section>
              {!username && (
                <div>
                  <button onClick={this.handleClick}>Log In Here</button>
                  {viewLoginPage && <LoginPage loggedUser={this.loggedUser} />}
                </div>
              )}
              {username && (
                <p>
                  Welcome Back {username}!
                  <button
                    onClick={() => {
                      return this.loggedUser("") & this.handleClick();
                    }}
                  >
                    LOGOUT
                  </button>
                </p>
              )}
            </section>
          </section>
          <nav>
            <Navbar />
          </nav>
        </section>

        <main>
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
        </main>
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
