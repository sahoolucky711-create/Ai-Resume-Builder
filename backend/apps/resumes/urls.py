from django.urls import path
from .views import *
urlpatterns = [
    path('create/', ResumeCreateView.as_view()),
    path('list/', ResumeListView.as_view()),
    path('<int:pk>/', ResumeDetailView.as_view()),
    path('<int:pk>/update/', ResumeUpdateView.as_view()),
    path('<int:pk>/delete/', ResumeDeleteView.as_view()),
    path("skills/", SkillCreateView.as_view()),
    path("experience/", ExperienceCreateView.as_view()),
    path("education/", EducationCreateView.as_view()),
    path("projects/", ProjectCreateView.as_view()),


    path("<int:pk>/generate-pdf/", download_resume_pdf),
    path("<int:pk>/suggestions/", resume_suggestions),

]
