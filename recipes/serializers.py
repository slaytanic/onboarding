from recipes.models import Recipe, Ingredient
from rest_framework import serializers

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = IngredientSerializer(many=True) #serializers.StringRelatedField(many=True)
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'description', 'ingredients']

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)

        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)

        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        Ingredient.objects.filter(recipe=instance).delete()

        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=instance, **ingredient_data)

        return instance
