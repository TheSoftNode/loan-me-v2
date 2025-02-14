# permissions.py
from rest_framework.permissions import BasePermission, IsAuthenticated

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'admin')

class IsAuthenticatedAndAdmin(IsAuthenticated, IsAdminUser):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and IsAdminUser.has_permission(self, request, view)