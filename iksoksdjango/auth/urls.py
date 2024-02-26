from django.urls import path

from auth import views


urlpatterns = [
    path("registation/", views.registration, name="registration"),
    path("login/", views.user_login, name="login"),
    path("token-login/", views.token_login, name="token-login"),
    path("logout/", views.user_logout, name="logout"),
    path("deleteprofile/", views.delete_account, name="delete_profile"),
]
