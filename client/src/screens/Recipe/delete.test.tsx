import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { render, wait } from '@testing-library/react'
import { getRecipe, deleteRecipe } from 'data/recipes/api'
import ScreenRecipeDelete from './delete'
import userEvent from '@testing-library/user-event'
import { RenderAndHistory } from 'utils/test/types'

jest.mock('data/recipes/api')

function renderScreenRecipeDelete(
  options?: MemoryHistoryBuildOptions
): RenderAndHistory {
  const history = createMemoryHistory(options)
  const utils = render(
    <Router history={history}>
      <ScreenRecipeDelete />
    </Router>
  )

  return { ...utils, history }
}

describe('<ScreenRecipeDelete>', () => {
  it('should delete a recipe when submitted', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getRecipe.mockResolvedValue({
      id: 1,
      name: 'Pizza',
      description: 'Put it in the oven',
      ingredients: [{ name: 'Tomato' }],
    })
    const { getByText } = renderScreenRecipeDelete({
      initialEntries: ['/recipes/1/delete'],
    })
    await wait(() => getByText('Pizza'))
    userEvent.click(getByText('Yes'))
    expect(deleteRecipe).toHaveBeenCalledWith(1)
  })
})
