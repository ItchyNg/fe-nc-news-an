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
import LoginButton from "./components/LoginButton";
import { Link } from "@reach/router";
import "../src/rocketAnimation.scss";

class App extends React.Component {
  state = {
    user: ""
  };

  loggedUser = user => {
    this.setState({ user: user });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <section className="App_Top_Container">
          <Link to="/">
            <header>
              <Header />
            </header>
          </Link>
          <section className="App_Top_LoginButton_Container">
            <LoginButton loggedUser={this.loggedUser} user={user} />
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
              username={user.username}
              path="articles/:article_id"
            />
            <ErrorPage default />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
