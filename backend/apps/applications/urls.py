from django.urls import path
from .views import *

urlpatterns = [
    path("apply/", ApplyJobView.as_view()),
    path("list/", ApplicationListView.as_view()),
]
