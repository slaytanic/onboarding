import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { render, act } from '@testing-library/react'
import { createRecipe } from 'data/recipes/api'
import ScreenRecipeCreate from './create'
import userEvent from '@testing-library/user-event'
import { RenderAndHistory } from 'utils/test/types'

jest.mock('data/recipes/api')

function renderScreenRecipeCreate(
  options?: MemoryHistoryBuildOptions
): RenderAndHistory {
  const history = createMemoryHistory(options)
  const utils = render(
    <Router history={history}>
      <ScreenRecipeCreate />
    </Router>
  )

  return { ...utils, history }
}
describe('<ScreenRecipeCreate>', () => {
  it('should create recipe when submitted', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    createRecipe.mockResolvedValue()
    const { getByPlaceholderText, getByText } = renderScreenRecipeCreate()
    await act(async () => {
      await userEvent.type(getByPlaceholderText('Name'), 'Pizza')
      await userEvent.type(
        getByPlaceholderText('Description'),
        'Put it in the oven'
      )
      await userEvent.type(getByPlaceholderText('Ingredient #1'), 'Dough')
      return userEvent.click(getByText('Submit'))
    })

    expect(createRecipe).toHaveBeenCalledWith({
      description: 'Put it in the oven',
      ingredients: [{ name: 'Dough' }],
      name: 'Pizza',
    })
  })
})
