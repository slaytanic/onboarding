import React, { ReactElement } from 'react'
import { useAsync } from 'react-use'
import { Link, useLocation } from 'react-router-dom'
import qs from 'query-string'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Button } from '@bootstrap-styled/v4'

import RecipeList from 'components/RecipeList'

import { getRecipes } from 'data/recipes/api'

export default function ScreenRecipeList(): ReactElement {
  const location = useLocation()
  let q = ''
  if (location.search) {
    const params = qs.parse(location.search)
    if (params.q && typeof params.q === 'string') {
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
        <RecipeList className="mt-4" recipes={recipes.value} />
      )}
      <Button tag={Link} to={`/recipes/new`} className="mt-4">
        New Recipe
      </Button>
    </div>
  )
}
