import React, { ReactElement } from 'react'

import { Recipe } from 'data/recipes/types'

import RecipeItem from 'components/RecipeItem'

interface Props {
  recipes?: Recipe[];
}

export default function RecipeList({ recipes = [] }: Props): ReactElement {
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
