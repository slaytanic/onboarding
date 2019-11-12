import React from 'react'
import { render } from '@testing-library/react'
import RecipeItem from '.'
import { RenderAndHistory } from 'utils/test/types'
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { Router } from 'react-router-dom'
import { Recipe } from 'data/recipes/types'

const recipe = {
  name: 'Pizza',
  description: 'Put it in the oven',
  ingredients: [{ name: 'Tomato' }, { name: 'Dough' }, { name: 'Cheese' }],
}

interface Props {
  recipe: Recipe;
}

function renderRecipeItem(props: Props): RenderAndHistory {
  const history = createMemoryHistory()
  const utils = render(
    <Router history={history}>
      <RecipeItem {...props} />
    </Router>
  )

  return { ...utils, history }
}

describe('<RecipeItem>', () => {
  it('should render a valid recipe without crashing', async () => {
    renderRecipeItem({ recipe })
  })

  it('should render a recipe name', async () => {
    const { getByText } = renderRecipeItem({ recipe })
    expect(getByText('Pizza')).toBeInTheDocument()
  })
})
