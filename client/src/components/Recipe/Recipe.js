import React from 'react'

export default function Recipe({ recipe }) {
  return (
    <div>
      <h3>{recipe.name}</h3>
      <div>{recipe.description}</div>
      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients.map(ingredient => (
          <li>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  )
}
