from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bio = models.TextField(blank=True)
    reputation = models.IntegerField(default=0)
    avatar_url = models.URLField(blank=True, null=True)

class JamRoom(models.Model):
    title = models.CharField(max_length=255)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosted_jams')
    genre = models.CharField(max_length=100)
    is_live = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class MicroEvent(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    start_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    event = models.ForeignKey(MicroEvent, on_delete=models.CASCADE, related_name='attendees')
    purchased_at = models.DateTimeField(auto_now_add=True)

class Donation(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations_sent')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations_received')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Badge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50)

class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    awarded_at = models.DateTimeField(auto_now_add=True)