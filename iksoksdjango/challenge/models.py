from django.db import models

# Create your models here.
class Challenge(models.Model):
    challenger = models.CharField(max_length=100)
    opponent = models.CharField(max_length=100)
    decision = models.BooleanField(null=True)