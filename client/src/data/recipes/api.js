import { request } from 'utils/api'

export function getRecipes() {
  return request('/recipes/')
}

export function getRecipe(id) {
  return request(`/recipes/${id}/`)
}

export function createRecipe(data) {
  return request(`/recipes/`, { method: 'POST', body: JSON.stringify(data) })
}

export function updateRecipe(id, data) {
  return request(`/recipes/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteRecipe(id) {
  return request(`/recipes/${id}/`, { method: 'DELETE' })
}
