import React from 'react'
import { useAsync } from 'react-use'

import RecipeList from 'components/RecipeList'

import { getRecipes } from 'data/recipes/api'

export default function Home() {
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
    </div>
  )
}
