from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_lobby, name="get_lobby"),
    path("challenge/<str:challenger>/<str:opponent_domain>", views.challange, name="challange"),
]
