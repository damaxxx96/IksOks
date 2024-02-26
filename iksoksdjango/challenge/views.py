import json
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from django.db.models import Q
from challenge.models import Challenge
from game.models import Game


# Create your views here.
def is_challenged(request: HttpRequest, player: str):
    if request.method == "GET":
        try:
            game = Game.objects.get(Q(player1=player) | Q(player2=player))
            return JsonResponse({"game": game.id})
        except:
            pass

        challenges = Challenge.objects.filter(Q(opponent=player) | Q(challenger=player))
        if len(challenges) > 0:
            challenge = challenges[0]
            return JsonResponse(
                {"challenger": challenge.challenger, "id": challenge.id, "decision": challenge.decision}, status=200
            )

        return HttpResponse(status=204)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def challenge(request: HttpRequest):
    if request.method == "POST":
        challege_request = json.loads(request.body)

        challenge = Challenge(
            challenger=challege_request["challenger"],
            opponent=challege_request["opponent"],
        )

        challenge.save()

        return HttpResponse(status=201)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def challenge_decision(request: HttpRequest):
    if request.method == "PATCH":
        decision = json.loads(request.body)

        challenge = Challenge.objects.get(pk=decision["id"])

        challenge.decision = decision["decision"]

        challenge.save()

        return HttpResponse(status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def challenge_result(request: HttpRequest, challenge_id):
    if request.method == "DELETE":

        challenge = Challenge.objects.get(pk=challenge_id)


        if challenge.decision == True:
            game = Game(player1=challenge.challenger, player2=challenge.opponent)
            game.save()

        challenge.delete()

        return HttpResponse(status=204)

    return JsonResponse({"error": "Invalid request method"}, status=405)