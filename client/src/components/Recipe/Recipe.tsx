import React, { ReactElement } from 'react'

import { Recipe as RecipeType, Ingredient } from 'data/recipes/types'

interface Props {
  recipe?: RecipeType;
}

export default function Recipe({ recipe }: Props): ReactElement {
  if (!recipe) {
    return <div>No recipe for you!</div>
  }
  return (
    <div>
      <h3>{recipe.name}</h3>
      <div>{recipe.description}</div>
      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients.map((ingredient: Ingredient, i: number) => (
          <li key={i}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  )
}
