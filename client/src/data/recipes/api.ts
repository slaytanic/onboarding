import { request } from 'utils/api'
import { Recipe } from './types'

export function getRecipes(q: string): Promise<Recipe[]> {
  if (q) {
    return request(`/recipes/?name=${q}`)
  }
  return request('/recipes/')
}

export function getRecipe(id?: number | string): Promise<Recipe> {
  return request(`/recipes/${id}/`)
}

export function createRecipe(data: Recipe): Promise<Recipe> {
  return request(`/recipes/`, { method: 'POST', body: JSON.stringify(data) })
}

export function updateRecipe(
  id: number | string,
  data: Recipe
): Promise<Recipe> {
  return request(`/recipes/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteRecipe(id: number | string): Promise<Recipe> {
  return request(`/recipes/${id}/`, { method: 'DELETE' })
}
