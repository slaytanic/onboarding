import React from 'react'
import { render } from '@testing-library/react'
import RecipeList from '.'
import { RenderAndHistory } from 'utils/test/types'
import { Recipe } from 'data/recipes/types'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const recipes = [
  {
    id: 1,
    name: 'Pizza',
    description: 'Put it in the oven',
    ingredients: [{ name: 'Tomato' }, { name: 'Dough' }, { name: 'Cheese' }],
  },
  {
    id: 2,
    name: 'Bread',
    description: 'Put it in the oven',
    ingredients: [{ name: 'Dough' }],
  },
]

interface Props {
  recipes: Recipe[];
}

function renderRecipeList(props?: Props): RenderAndHistory {
  const history = createMemoryHistory()
  const utils = render(
    <Router history={history}>
      <RecipeList {...props} />
    </Router>
  )

  return { ...utils, history }
}

describe('<RecipeList>', () => {
  it('should render a valid recipe without crashing', async () => {
    renderRecipeList({ recipes })
  })

  it('should render an undefined recipe list without crashing', async () => {
    renderRecipeList()
  })
})
