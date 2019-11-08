import React from 'react'
import { useAsync } from 'react-use'
import { Link, useParams } from 'react-router-dom'

import RecipeForm from 'components/RecipeForm'

import { getRecipe, updateRecipe } from 'data/recipes/api'

export default function RecipeEdit() {
  const { id } = useParams()
  const recipe = useAsync(() => getRecipe(id), [id])
  return (
    <div>
      {recipe.error ? (
        'Failed to load recipe'
      ) : recipe.loading ? (
        'Loading recipe...'
      ) : (
        <RecipeForm
          recipe={recipe.value}
          onSubmit={values => updateRecipe(id, values)}
        />
      )}
      <Link to={`/recipes/${id}`}>Cancel</Link>
    </div>
  )
}
