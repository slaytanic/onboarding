import React from 'react'
import { render } from '@testing-library/react'
import Recipe from '.'

const recipe = {
  name: 'Pizza',
  description: 'Put it in the oven',
  ingredients: [{ name: 'Tomato' }, { name: 'Dough' }, { name: 'Cheese' }],
}

describe('<Recipe>', () => {
  it('should render a valid recipe without crashing', async () => {
    render(<Recipe recipe={recipe} />)
  })

  it('should render a recipe name', async () => {
    const { getByText } = render(<Recipe recipe={recipe} />)
    expect(getByText('Pizza')).toBeInTheDocument()
  })

  it('should render a recipe description', async () => {
    const { getByText } = render(<Recipe recipe={recipe} />)
    expect(getByText('Put it in the oven')).toBeInTheDocument()
  })

  it('should render recipe ingredients', async () => {
    const { getByText } = render(<Recipe recipe={recipe} />)
    expect(getByText('Tomato')).toBeInTheDocument()
    expect(getByText('Dough')).toBeInTheDocument()
    expect(getByText('Cheese')).toBeInTheDocument()
  })

  it('should render an undefined recipe without crashing', async () => {
    render(<Recipe />)
  })
})
