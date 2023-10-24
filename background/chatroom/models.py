from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_field):
        if not email:
            raise ValueError("users must have email address")
        

        email = self.normalize_email(email)
        User = self.model(email=email, **extra_field)
        User.set_password(password)
        User.save(using=self._db)
        return User
    
    def create_super(self, email, password=None, **extra_field):
        extra_field.setdefault("is_staff", True)
        extra_field.setdefault("is_superusr", True)
        return self.create_user(email, password, **extra_field)
    


class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    is_active =  models.BooleanField(default=True) 
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True) 

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def __str__(self) -> str:
        return self.email
    


class ChatModel(models.Model):
    sender = models.CharField(max_length=100, default=None)
    message = models.TextField(null=True, blank=True)
    thread_name = models.CharField(null=True, blank=True, max_length=50)
    timestemp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.message    