from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


from .serializers import RegisterSerializer, LoginSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get("email")
        password = serializer.validated_data.get("password")

        user = User.objects.filter(email=email).first()

        if not user:
            return Response({"error": "User not found"}, status=400)

        if not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user_id": user.id
        })


