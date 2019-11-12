import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { render, act, wait } from '@testing-library/react'
import { getRecipe, updateRecipe } from 'data/recipes/api'
import { RenderAndHistory } from 'utils/test/types'
import ScreenRecipeEdit from './edit'
import userEvent from '@testing-library/user-event'

jest.mock('data/recipes/api')

function renderScreenRecipeEdit(
  options?: MemoryHistoryBuildOptions
): RenderAndHistory {
  const history = createMemoryHistory(options)
  const utils = render(
    <Router history={history}>
      <ScreenRecipeEdit />
    </Router>
  )

  return { ...utils, history }
}
describe('<ScreenRecipeEdit>', () => {
  it('should update recipe when submitted', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getRecipe.mockResolvedValue({
      id: 1,
      name: 'Pizza',
      description: 'Put it in the oven',
      ingredients: [{ name: 'Tomato' }],
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    updateRecipe.mockResolvedValue()
    const { getByPlaceholderText, getByText } = renderScreenRecipeEdit({
      initialEntries: ['/recipes/1/edit'],
    })
    await wait(() => getByPlaceholderText('Name'))
    await act(async () => {
      await userEvent.type(getByPlaceholderText('Name'), 'Bread')
      await userEvent.type(
        getByPlaceholderText('Description'),
        'Put it in the oven'
      )
      await userEvent.type(getByPlaceholderText('Ingredient #1'), 'Dough')
      return userEvent.click(getByText('Submit'))
    })

    expect(updateRecipe).toHaveBeenCalledWith(1, {
      description: 'Put it in the oven',
      ingredients: [{ name: 'Dough' }],
      name: 'Bread',
    })
  })
})
