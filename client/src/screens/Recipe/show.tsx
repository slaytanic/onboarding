import React, { ReactElement } from 'react'
import { useAsync } from 'react-use'
import { Link, useParams } from 'react-router-dom'

import Recipe from 'components/Recipe'

import { getRecipe } from 'data/recipes/api'

export default function RecipeShow(): ReactElement {
  const { id } = useParams()
  const recipe = useAsync(() => getRecipe(id), [id])
  return (
    <div>
      {recipe.error ? (
        'Failed to load recipe'
      ) : recipe.loading ? (
        'Loading recipe...'
      ) : (
        <Recipe recipe={recipe.value} />
      )}
      <Link to={`/recipes/${id}/edit`}>Edit Recipe</Link>
    </div>
  )
}
