from rest_framework import serializers
from .models import User, JamRoom, MicroEvent, Ticket, Donation, Badge, UserBadge

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'bio', 'reputation', 'avatar_url')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class JamRoomSerializer(serializers.ModelSerializer):
    host_name = serializers.CharField(source='host.username', read_only=True)
    class Meta:
        model = JamRoom
        fields = '__all__'
        read_only_fields = ('host',)

class MicroEventSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.username', read_only=True)
    class Meta:
        model = MicroEvent
        fields = '__all__'
        read_only_fields = ('artist',)

class TicketSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ('user',)

class DonationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)
    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('sender',)

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'