from django.urls import path
from .views import AIMatchView

urlpatterns = [
    path('match/', AIMatchView.as_view()),
]
