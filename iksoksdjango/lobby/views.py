from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from django.http import HttpRequest, JsonResponse
import requests
from auth.decorators.custom_login_decorator import custom_login_required

from django.views.decorators.csrf import csrf_exempt

from auth.helpers.auth_helper import retrieve_user


@csrf_exempt
# @custom_login_required
def get_lobby(request: HttpRequest):
    if request.method == "GET":
        # Get all session objects
        sessions = Session.objects.all()

        # Get a list of user IDs from the sessions
        user_ids = [
            int(session.get_decoded().get("_auth_user_id"))
            for session in sessions
            if "_auth_user_id" in session.get_decoded()
        ]

        # Get the User objects corresponding to the user IDs
        users = User.objects.filter(id__in=user_ids)

        # Get the usernames of users with valid tokens
        usernames = [user.username for user in users]

        # Return the usernames in a JsonResponse
        return JsonResponse({"usernames": usernames})

    return JsonResponse({"error": "Invalid request method"}, status=405)


def challange(request: HttpRequest, challenger, opponent_domain: str):
    if request.method == "POST":
        data = {
            "challenger": challenger,
        }

        try:
            # Make a POST request to the React app
            response = requests.post(
                "http://localhost:" + opponent_domain + "/challenge_endpoint", json=data
            )


            # Check if the request was successful (status code 200)
            if response.status_code == 200:
                # Process the response from the React app
                # EITHER YES OR NO
                react_response_data = response.json()
                return JsonResponse(react_response_data, status=200)
            else:
                # Handle other status codes if needed
                return JsonResponse(
                    {
                        "error": f"Request to React app failed with status code {response.status_code}"
                    },
                    status=500,
                )

        except requests.RequestException as e:
            # Handle exceptions if the request fails
            return JsonResponse(
                {"error": f"Request to React app failed: {str(e)}"}, status=500
            )

    return JsonResponse({"error": "Invalid request method"}, status=405)
