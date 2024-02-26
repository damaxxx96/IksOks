from django.urls import path

from . import views

urlpatterns = [
    path("move/", views.move, name="move"),
    path("<int:game_id>", views.get_game, name="get_game"),
]
