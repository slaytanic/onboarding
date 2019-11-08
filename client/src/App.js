import React from 'react'
// import logo from './logo.svg'
import './App.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from 'screens/Home'
import {
  RecipeShow,
  RecipeEdit,
  RecipeList,
  RecipeCreate,
  RecipeDelete,
} from 'screens/Recipe'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header> */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recipes">
            <RecipeList></RecipeList>
          </Route>
          <Route exact path="/recipes/new">
            <RecipeCreate></RecipeCreate>
          </Route>
          <Route exact path="/recipes/:id">
            <RecipeShow></RecipeShow>
          </Route>
          <Route exact path="/recipes/:id/edit">
            <RecipeEdit></RecipeEdit>
          </Route>
          <Route exact path="/recipes/:id/delete">
            <RecipeDelete></RecipeDelete>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
