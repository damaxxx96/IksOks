from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
from django.contrib.sessions.models import Session
from auth.decorators.custom_login_decorator import custom_login_required




@csrf_exempt
def registration(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data["username"]
            password = data["password"]

            # Use create_user to properly hash the password
            new_user = User.objects.create_user(username=username, password=password)

            return JsonResponse({"message": "Registration successful"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def user_login(request: HttpRequest):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data["username"]
            password = data["password"]

             # Check if the user is already authenticated
            if request.user.is_authenticated:
                return JsonResponse({"message": "User is already logged in"}, status=409)

            # Authenticate user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                sessionid = request.session.session_key
                return JsonResponse({"token": sessionid}, status=200)
            else:
                return JsonResponse(
                    {"error": "Invalid username or password"}, status=401
                )
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def token_login(request: HttpRequest):
    if request.method == "GET":
        sessionid = request.headers.get("Authorization")
        if sessionid:
            try: 
                session = Session.objects.get(session_key=sessionid)
                user_id = session.get_decoded().get("_auth_user_id")
                user = User.objects.get(pk=user_id)

                return JsonResponse({"username": user.username}, status=200)
            except:
                return JsonResponse({"error": "Token invalid"}, status=401)

        else:
            return JsonResponse({"error": "Token invalid"}, status=401)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


@custom_login_required
def user_logout(request):
    logout(request)
    return JsonResponse({"message": "Logout successful"})

@custom_login_required
def delete_account(request):
    if request.method == "POST":
        try:
            # Use request.user instead of retrieve_user(request)
            user = request.user
            logout(request)
            user.delete()
            return JsonResponse({"message": "Account deleted successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

