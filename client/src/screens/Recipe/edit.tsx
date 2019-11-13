import React, { ReactElement } from 'react'
import { useAsync } from 'react-use'
import { Link, useParams } from 'react-router-dom'

import RecipeForm from 'components/RecipeForm'

import { getRecipe, updateRecipe } from 'data/recipes/api'
import { Recipe } from 'data/recipes/types'

export default function RecipeEdit(): ReactElement {
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
          onSubmit={(values: Recipe): void => {
            if (recipe && recipe.value && recipe.value.id) {
              updateRecipe(recipe.value.id, values)
            }
          }}
        />
      )}
      <Link className="mt-4" to={`/recipes/${id}`}>
        Go back
      </Link>
    </div>
  )
}
