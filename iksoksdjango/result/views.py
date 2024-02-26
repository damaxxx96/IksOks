from django.http import JsonResponse
from django.db.models import Q
from result.models import GameResult

def get_results(request, player1, player2):
   
    player1_victories = GameResult.objects.filter(
        Q(player1=player1, player2=player2, result=1) | 
        Q(player1=player2, player2=player1, result=2)
    ).count()

    player2_victories = GameResult.objects.filter(
        Q(player1=player2, player2=player1, result=1) |
        Q(player1=player1, player2=player2, result=2)
    ).count()

    response_data = {
        'player1': {
            'name': player1,
            'victories': player1_victories
        },
        'player2': {
            'name': player2,
            'victories': player2_victories
        }
    }

    return JsonResponse(response_data)
