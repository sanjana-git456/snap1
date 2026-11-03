from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, JamRoom, MicroEvent, Ticket, Donation, Badge, UserBadge
from .serializers import (
    UserSerializer, RegisterSerializer, JamRoomSerializer, 
    MicroEventSerializer, TicketSerializer, DonationSerializer, BadgeSerializer
)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_me(request):
    return Response(UserSerializer(request.user).data)

class JamRoomViewSet(viewsets.ModelViewSet):
    queryset = JamRoom.objects.filter(is_live=True).order_by('-created_at')
    serializer_class = JamRoomSerializer
    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

class MicroEventViewSet(viewsets.ModelViewSet):
    queryset = MicroEvent.objects.filter(is_active=True).order_by('start_time')
    serializer_class = MicroEventSerializer
    def perform_create(self, serializer):
        serializer.save(artist=self.request.user)

@api_view(['POST'])
def buy_ticket(request, event_id):
    try:
        event = MicroEvent.objects.get(pk=event_id)
        if Ticket.objects.filter(user=request.user, event=event).exists():
            return Response({'detail': 'Already purchased'}, status=400)
        ticket = Ticket.objects.create(user=request.user, event=event)
        return Response(TicketSerializer(ticket).data, status=201)
    except MicroEvent.DoesNotExist:
        return Response({'detail': 'Event not found'}, status=404)

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)