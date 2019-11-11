import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from '@bootstrap-styled/v4'
import BootstrapProvider from '@bootstrap-styled/provider'

import Home from 'screens/Home'
import {
  RecipeShow,
  RecipeEdit,
  RecipeList,
  RecipeCreate,
  RecipeDelete,
} from 'screens/Recipe'
import AppHeader from './components/AppHeader'

function App() {
  return (
    <BootstrapProvider>
      <Router>
        <AppHeader />
        <Container>
          <Switch>
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
        </Container>
      </Router>
    </BootstrapProvider>
  )
}

export default App
