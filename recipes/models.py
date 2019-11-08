from django.db import models

# Create your models here.
class Recipe(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=200)
    recipe = models.ForeignKey(Recipe, related_name='ingredients', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
