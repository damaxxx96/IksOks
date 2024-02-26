import json
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from game.helper.check_game_over import check_game_over
from django.core.exceptions import ObjectDoesNotExist
from game.models import Game
from result.models import GameResult


# Create your views here.
def move(request: HttpRequest):
    if request.method == "PATCH":
        try:
            data = json.loads(request.body)
            game = data["game"]
            move = data["move"]

            game = Game.objects.get(pk=game)

            game.move = move
            game.save()

            result = check_game_over(game.move)

            if result:
                game.delete()

                if result == "X":
                    game_result = GameResult(
                        player1=game.player1, player2=game.player2, result=1
                    )
                elif result == "O":
                    game_result = GameResult(
                        player1=game.player2, player2=game.player2, result=2
                    )
                else:
                    game_result = GameResult(
                        player1=game.player2, player2=game.player2, result=0
                    )

                game_result.save()

                if result == "Tie":
                    return JsonResponse({"result": "Tie!"}, status=201)
                else:
                    return JsonResponse(
                        {"result": "Player " + result + " has won!"}, status=201
                    )
            else:
                return JsonResponse({"result": "Next move"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def get_game(request: HttpRequest, game_id):
    if request.method == "GET":
        try:
            try:
                game = Game.objects.get(pk=game_id)
            except ObjectDoesNotExist:
                game_result = GameResult.objects.last()
                if game_result.result == 0:
                    result = "Tie!"
                elif game_result.result == 1:
                    result = "Player 1 has won!"
                else:
                    result = "Player 2 has won!"
                return JsonResponse(
                    {"error": "Game not found", "result": result}, status=404
                )

            # Convert game data to a format that can be serialized
            game_data = {
                "move": game.move
                # Add other fields as needed
            }

            return JsonResponse(game_data, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
