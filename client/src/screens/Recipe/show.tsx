import React, { ReactElement } from 'react'
import { useAsync } from 'react-use'
import { Link, useParams } from 'react-router-dom'

import {
  Button,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from '@bootstrap-styled/v4'

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
      <Button className="mt-4" tag={Link} to={`/recipes/${id}/edit`}>
        Edit Recipe
      </Button>
    </div>
  )
}
