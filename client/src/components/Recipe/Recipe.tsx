import React, { ReactElement } from 'react'

import { Recipe as RecipeType, Ingredient } from 'data/recipes/types'

import {
  P,
  H3,
  H5,
  ListGroup,
  ListGroupItem,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from '@bootstrap-styled/v4'

interface Props {
  recipe?: RecipeType;
}

export default function Recipe({ recipe }: Props): ReactElement {
  if (!recipe) {
    return <div>No recipe for you!</div>
  }
  return (
    <div>
      <H3 className="mt-4">{recipe.name}</H3>
      <P>{recipe.description}</P>
      <H5>Ingredients</H5>
      <ListGroup>
        {recipe.ingredients.map((ingredient: Ingredient, i: number) => (
          <ListGroupItem key={i}>{ingredient.name}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}
