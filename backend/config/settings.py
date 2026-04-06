import os
from pathlib import Path
from datetime import timedelta
import dj_database_url

# ===============================
# BASE DIRECTORY
# ===============================
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# ===============================
# SECURITY
# ===============================
SECRET_KEY = os.environ.get(
    "SECRET_KEY", "django-insecure-fallback-secret-key-2026"
)

DEBUG = True

ALLOWED_HOSTS = [
    "ai-resume-builder-backend-77p6.onrender.com",
    "127.0.0.1",
    "localhost"
]

# ===============================
# APPLICATIONS
# ===============================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "drf_yasg",
    "corsheaders",

    "apps.accounts",
    "apps.resumes",
    "apps.jobs",
    "apps.applications",
    "apps.notifications",
    "apps.analytics",
    "apps.ai_matching.apps.AiMatchingConfig",
]

# ===============================
# MIDDLEWARE
# ===============================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ===============================
# TEMPLATES (for Admin)
# ===============================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],  # optional
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ===============================
# URLS & WSGI
# ===============================
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

# ===============================
# DATABASE (PostgreSQL for Render)
# ===============================
DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get(
            "DATABASE_URL", f"sqlite:///{BASE_DIR / 'db.sqlite3'}"
        )
    )
}

# ===============================
# STATIC FILES
# ===============================
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ===============================
# MEDIA FILES
# ===============================
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ===============================
# AUTH
# ===============================
AUTH_USER_MODEL = "accounts.User"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ===============================
# REST FRAMEWORK (JWT Auth)
# ===============================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# ===============================
# SWAGGER
# ===============================
SWAGGER_SETTINGS = {
    "USE_SESSION_AUTH": False,
    "SECURITY_DEFINITIONS": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}

# ===============================
# CORS (Frontend allowed)
# ===============================
CORS_ALLOWED_ORIGINS = [
    "https://airesumebuilder-theta.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
CORS_ALLOW_CREDENTIALS = True

# ===============================
# SECURITY FOR HTTPS
# ===============================
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
CSRF_TRUSTED_ORIGINS = [
    "https://ai-resume-builder-backend-77p6.onrender.com",
    "https://airesumebuilder-theta.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
