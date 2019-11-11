from django.shortcuts import render
from rest_framework import viewsets
from recipes.models import Recipe, Ingredient
from recipes.serializers import RecipeSerializer

# Create your views here.

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        queryset = self.queryset.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__contains=name)
        return queryset
