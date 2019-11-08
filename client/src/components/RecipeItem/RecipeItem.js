import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeItem({ recipe }) {
  return (
    <li>
      {recipe.name} <Link to={`/recipes/${recipe.id}`}>Show</Link>{' '}
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>{' '}
      <Link to={`/recipes/${recipe.id}/delete`}>Delete</Link>
    </li>
  )
}
