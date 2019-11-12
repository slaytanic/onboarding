import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Recipe } from 'data/recipes/types'

interface Props {
  recipe: Recipe;
}

export default function RecipeItem({ recipe }: Props): ReactElement {
  return (
    <li>
      {recipe.name} <Link to={`/recipes/${recipe.id}`}>Show</Link>{' '}
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>{' '}
      <Link to={`/recipes/${recipe.id}/delete`}>Delete</Link>
    </li>
  )
}
