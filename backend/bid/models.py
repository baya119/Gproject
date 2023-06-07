from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

user = get_user_model()

class Bid(models.Model):
    creater = models.ForeignKey(user, on_delete=models.CASCADE)
    