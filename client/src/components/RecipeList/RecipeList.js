import React from 'react'

import RecipeItem from 'components/RecipeItem'

export default function RecipeList({ recipes }) {
  if (!recipes.length) {
    return <div>No recipes :(</div>
  }
  return (
    <ul className="RecipeList">
      {recipes.map(recipe => (
        <RecipeItem key={recipe.id} recipe={recipe}></RecipeItem>
      ))}
    </ul>
  )
}
