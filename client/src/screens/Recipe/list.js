import React from 'react'
import { useAsync } from 'react-use'
import { Link, useLocation } from 'react-router-dom'
import qs from 'query-string'

import RecipeList from 'components/RecipeList'

import { getRecipes } from 'data/recipes/api'

export default function ViewRecipeList() {
  const location = useLocation()
  let q
  if (location.search) {
    const params = qs.parse(location.search)
    if (params.q) {
      q = params.q
    }
  }

  const recipes = useAsync(() => getRecipes(q), [q])

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
