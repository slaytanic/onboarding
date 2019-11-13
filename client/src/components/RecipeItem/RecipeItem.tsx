import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Recipe } from 'data/recipes/types'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { ListGroupItem, Col, Row, Button } from '@bootstrap-styled/v4'

interface Props {
  recipe: Recipe;
}

export default function RecipeItem({ recipe }: Props): ReactElement {
  return (
    <ListGroupItem>
      <Row className="w-100">
        <Col>{recipe.name}</Col>
        <Col md="6">
          <Button tag={Link} to={`/recipes/${recipe.id}`}>
            Show
          </Button>
          <Button
            tag={Link}
            to={`/recipes/${recipe.id}/edit`}
            className="ml-2 mr-2"
          >
            Edit
          </Button>
          <Button tag={Link} to={`/recipes/${recipe.id}/delete`}>
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  )
}
