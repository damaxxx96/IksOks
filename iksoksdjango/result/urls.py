from django.urls import path

from . import views

urlpatterns = [
    path("<str:player1>/<str:player2>/", views.get_results, name="get_results"),
]
