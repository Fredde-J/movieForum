import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home'
import ThreadPage from './pages/ThreadPage'
import PostPage from './pages/PostsPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import UserContextProvider from './contexts/UserContext'
import AdminPage from './pages/AdminPage'
import './css/style.css';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <UserContextProvider>
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
          <Route exact path = "/login">
          <LoginPage></LoginPage>
          </Route>
          <Route exact path = "/admin">
          <AdminPage/>
          </Route>
        </Switch>
      </main>
      </UserContextProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
