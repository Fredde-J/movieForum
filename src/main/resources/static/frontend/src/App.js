import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home'
import ThreadPage from './pages/ThreadPage'
import PostPage from './pages/PostsPage'
import './css/style.css';
import Header from './components/Header'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <main className="container">
        <Switch>
          <Route exact path ="/">
          <Home></Home>
          </Route>
          <Route exact path = "/threads/:id">
          <ThreadPage></ThreadPage>
          </Route>
          <Route exact path = "/posts/:id">
          <PostPage></PostPage>
          </Route>
        </Switch>
     
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
