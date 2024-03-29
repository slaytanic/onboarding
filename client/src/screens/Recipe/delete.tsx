import React, { ReactElement } from 'react'
import { useAsync } from 'react-use'
import { Link, useParams, useHistory } from 'react-router-dom'

import Recipe from 'components/Recipe'

import { getRecipe, deleteRecipe } from 'data/recipes/api'

export default function RecipeShow(): ReactElement {
  const { id } = useParams()
  const history = useHistory()
  const recipe = useAsync(() => getRecipe(id), [id])
  return (
    <div>
      <h3>Are you sure you want to delete this recipe?</h3>
      {recipe.error ? (
        'Failed to load recipe'
      ) : recipe.loading ? (
        'Loading recipe...'
      ) : (
        <>
          <Recipe recipe={recipe.value} />
          <button
            onClick={async (): Promise<void> => {
              if (recipe && recipe.value && recipe.value.id) {
                await deleteRecipe(recipe.value.id)
                history.push('/recipes')
              }
            }}
          >
            Yes
          </button>
          <Link to={`/recipes`}>No</Link>
        </>
      )}
    </div>
  )
}
