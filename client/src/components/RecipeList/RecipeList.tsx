import React, { ReactElement } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { ListGroup } from '@bootstrap-styled/v4'

import { Recipe } from 'data/recipes/types'

import RecipeItem from 'components/RecipeItem'

interface Props {
  recipes?: Recipe[];
  className?: string;
}

export default function RecipeList({
  recipes = [],
  ...props
}: Props): ReactElement {
  if (!recipes.length) {
    return <div>No recipes :(</div>
  }
  return (
    <ListGroup {...props}>
      {recipes.map(recipe => (
        <RecipeItem key={recipe.id} recipe={recipe}></RecipeItem>
      ))}
    </ListGroup>
  )
}
