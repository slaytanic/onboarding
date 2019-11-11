import React from 'react'
import { useAsync } from 'react-use'
import { Link } from 'react-router-dom'

import RecipeList from 'components/RecipeList'

import { getRecipes } from 'data/recipes/api'

export default function ViewRecipeList() {
  const recipes = useAsync(getRecipes)
  return (
    <div>
      {recipes.error ? (
        'Failed to load recipes'
      ) : recipes.loading ? (
        'Loading recipes...'
      ) : (
        <RecipeList recipes={recipes.value} />
      )}
      <Link to={`/recipes/new`}>New Recipe</Link>
    </div>
  )
}
