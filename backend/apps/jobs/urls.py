from django.urls import path
from .views import *

urlpatterns = [
    path('create/', JobCreateView.as_view()),
    path('list/', JobListView.as_view()),
    path('<int:pk>/', JobDetailView.as_view()),
    path('<int:pk>/update/', JobUpdateView.as_view()),
    path('<int:pk>/delete/', JobDeleteView.as_view()),
    path("matches/", JobMatchesView.as_view()),
]
