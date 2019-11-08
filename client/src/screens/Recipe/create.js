import React from 'react'
import { Link } from 'react-router-dom'

import RecipeForm from 'components/RecipeForm'

import { createRecipe } from 'data/recipes/api'

export default function RecipeCreate() {
  return (
    <div>
      <RecipeForm onSubmit={createRecipe} />
      <Link to={`/recipes`}>Cancel</Link>
    </div>
  )
}
