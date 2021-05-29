from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
from snippets import views

router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls')),
]
