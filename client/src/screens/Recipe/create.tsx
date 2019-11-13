import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import RecipeForm from 'components/RecipeForm'

import { createRecipe } from 'data/recipes/api'

export default function RecipeCreate(): ReactElement {
  return (
    <div>
      <RecipeForm onSubmit={createRecipe} />
      <Link className="mt-4" to={`/recipes`}>
        Go back
      </Link>
    </div>
  )
}
