from django.test import TestCase
from recipes.models import Recipe, Ingredient
from recipes.serializers import RecipeSerializer

# Create your tests here.
class TestRecipes(TestCase):
    def test_create_recipe(self):
        data = {'name': 'Pizza', 'description': 'Put it in the oven', 'ingredients': [{'name': 'tomato'}, {'name': 'dough'}, {'name': 'cheese'}]}
        self.client.post('/api/v1/recipes/', data, "application/json")
        recipes = Recipe.objects.all()
        self.assertEquals(len(recipes), 1)
        self.assertEqual(recipes[0].name, data['name'])
        self.assertEqual(recipes[0].description, data['description'])

        ingredients = Ingredient.objects.filter(recipe=recipes[0])
        self.assertEqual(ingredients[0].name, data['ingredients'][0]['name'])
        self.assertEqual(ingredients[1].name, data['ingredients'][1]['name'])
        self.assertEqual(ingredients[2].name, data['ingredients'][2]['name'])

    def test_read_recipes(self):
        recipe = Recipe.objects.create(name='Pizza', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')
        Ingredient.objects.create(recipe=recipe, name='tomato')
        Ingredient.objects.create(recipe=recipe, name='cheese')

        recipe = Recipe.objects.create(name='Bread', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')

        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True) 
        response = self.client.get('/api/v1/recipes/')  # urlresolver
        self.assertEquals(len(response.data), 2)
        self.assertEqual(response.data, serializer.data)

    def test_read_filtered_recipes(self):
        recipe = Recipe.objects.create(name='Pizza', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')
        Ingredient.objects.create(recipe=recipe, name='tomato')
        Ingredient.objects.create(recipe=recipe, name='cheese')

        recipe = Recipe.objects.create(name='Bread', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')

        recipes = Recipe.objects.filter(name__contains='Pi')
        serializer = RecipeSerializer(recipes, many=True) 
        response = self.client.get('/api/v1/recipes/?name=Pi')  # urlresolver
        self.assertEquals(len(response.data), 1)
        self.assertEqual(response.data, serializer.data)

    def test_read_recipe(self):
        recipe = Recipe.objects.create(name='Bread', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')

        recipe = Recipe.objects.get(pk=1)
        serializer = RecipeSerializer(recipe) 
        response = self.client.get('/api/v1/recipes/1/')  # urlresolver
        self.assertEqual(response.data, serializer.data)

    def test_update_recipe(self):
        recipe = Recipe.objects.create(name='Bread', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')

        data = {'name': 'Pizza', 'description': 'Put it in the oven', 'ingredients': [{'name': 'tomato'}, {'name': 'dough'}, {'name': 'cheese'}]}
        self.client.put('/api/v1/recipes/1/', data, "application/json")

        recipes = Recipe.objects.all()
        self.assertEquals(len(recipes), 1)
        self.assertEqual(recipes[0].name, data['name'])
        self.assertEqual(recipes[0].description, data['description'])

        ingredients = Ingredient.objects.filter(recipe=recipes[0])
        self.assertEqual(ingredients[0].name, data['ingredients'][0]['name'])
        self.assertEqual(ingredients[1].name, data['ingredients'][1]['name'])
        self.assertEqual(ingredients[2].name, data['ingredients'][2]['name'])

    def test_delete_recipe(self):
        recipe = Recipe.objects.create(name='Bread', description='Put it in the oven')
        Ingredient.objects.create(recipe=recipe, name='dough')

        response = self.client.delete('/api/v1/recipes/1/')

        recipes = Recipe.objects.all()
        self.assertEquals(len(recipes), 0)
