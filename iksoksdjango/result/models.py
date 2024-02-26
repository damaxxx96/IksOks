
from django.db import models

class GameResult(models.Model):
    PLAYER_CHOICES = [
        (0, "Tie"),
        (1, 'Player 1 Wins'),
        (2, 'Player 2 Wins'),
    ]

    player1 = models.CharField(max_length=100)
    player2 = models.CharField(max_length=100)
    result = models.IntegerField(choices=PLAYER_CHOICES)

    def __str__(self):
        return f"{self.player1} vs {self.player2} - Result: {self.get_result_display()}"
