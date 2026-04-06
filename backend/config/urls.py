from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="AI Resume Builder API",
        default_version='v1',
        description="API documentation",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
    authentication_classes=[]
)

from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"status": "ok", "message": "AI Resume Builder Backend is running successfully!"})

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('api/resumes/', include('apps.resumes.urls')),
    path('api/ai/', include('apps.ai_matching.urls')),
    path('api/jobs/', include('apps.jobs.urls')),
    path("api/applications/", include("apps.applications.urls")),
]
swagger_settings = {
    'USE_SESSION_AUTH': False,
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    }
}
