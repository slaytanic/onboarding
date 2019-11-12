import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { render, act, wait } from '@testing-library/react'
import { getRecipe, updateRecipe } from 'data/recipes/api'
import { RenderAndHistory } from 'utils/test/types'
import ScreenRecipeShow from './show'
import userEvent from '@testing-library/user-event'

jest.mock('data/recipes/api')

function renderScreenRecipeShow(
  options?: MemoryHistoryBuildOptions
): RenderAndHistory {
  const history = createMemoryHistory(options)
  const utils = render(
    <Router history={history}>
      <ScreenRecipeShow />
    </Router>
  )

  return { ...utils, history }
}
describe('<ScreenRecipeShow>', () => {
  it('should fetch and display recipe information', async () => {
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
    await act(async () => {
      const { getByText } = renderScreenRecipeShow({
        initialEntries: ['/recipes/1'],
      })

      await wait(() => getByText('Pizza'))

      expect(getByText('Pizza')).toBeInTheDocument()
      expect(getByText('Put it in the oven')).toBeInTheDocument()
      expect(getByText('Tomato')).toBeInTheDocument()
    })
  })
})
