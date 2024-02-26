
from django.db import models

class Game(models.Model):

    player1 = models.CharField(max_length=100)
    player2 = models.CharField(max_length=100)
    move = models.CharField(max_length=100, default="1*,2*,3*,4*,5*,6*,7*,8*,9*")

    def __str__(self):
        return f"{self.player1} vs {self.player2} - Move: {self.get_result_display()}"
