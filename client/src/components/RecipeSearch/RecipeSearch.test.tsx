import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecipeSearch from '.'

function renderRecipeSearch(): RenderAndHistory {
  const history = createMemoryHistory()
  const utils = render(
    <Router history={history}>
      <RecipeSearch />
    </Router>
  )

  return { ...utils, history }
}
describe('<RecipeSearch>', () => {
  it('should accept a query', async () => {
    const { getByPlaceholderText, getByText, history } = renderRecipeSearch()
    await act(async () => {
      await userEvent.type(getByPlaceholderText('Search'), 'Pizza')
      return userEvent.click(getByText('Search'))
    })
    expect(history.location.search).toBe('?q=Pizza')
  })
})
