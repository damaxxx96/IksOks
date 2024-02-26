from django.urls import path

from . import views

urlpatterns = [
    path("is-challenged/<str:player>", views.is_challenged, name="is_challenged"),
    path("", views.challenge, name="challange"),
    path("challenge-decision/", views.challenge_decision, name="challange_decision"),
    path("challenge-result/<int:challenge_id>", views.challenge_result, name="challenge_result"),
]
