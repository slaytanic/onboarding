import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistoryBuildOptions } from 'history'
import { render, act } from '@testing-library/react'
import { getRecipes } from 'data/recipes/api'
import { RenderAndHistory } from 'utils/test/types'
import ScreenRecipeList from './list'

jest.mock('data/recipes/api')

function renderScreenRecipeList(
  options?: MemoryHistoryBuildOptions
): RenderAndHistory {
  const history = createMemoryHistory(options)
  const utils = render(
    <Router history={history}>
      <ScreenRecipeList />
    </Router>
  )

  return { ...utils, history }
}
describe('<ScreenRecipeList>', () => {
  it('should query unfiltered results when param is not present', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getRecipes.mockResolvedValue([])
    await act(async () =>
      renderScreenRecipeList({ initialEntries: ['/recipes/'] })
    )
    expect(getRecipes).toHaveBeenCalledWith('')
  })

  it('should query filtered results when param is present', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getRecipes.mockResolvedValue([])
    await act(async () =>
      renderScreenRecipeList({ initialEntries: ['/recipes/?q=Pizza'] })
    )
    expect(getRecipes).toHaveBeenCalledWith('Pizza')
  })
})
