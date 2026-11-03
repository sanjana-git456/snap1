from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    register_view, login_view, get_me, JamRoomViewSet, 
    MicroEventViewSet, buy_ticket, DonationViewSet
)

router = DefaultRouter()
router.register(r'jams', JamRoomViewSet)
router.register(r'events', MicroEventViewSet)
router.register(r'donations', DonationViewSet)

urlpatterns = [
    path('auth/register/', register_view),
    path('auth/login/', login_view),
    path('auth/me/', get_me),
    path('events/<int:event_id>/buy/', buy_ticket),
    path('', include(router.urls)),
]