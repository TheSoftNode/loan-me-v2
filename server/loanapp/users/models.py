from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings
from django.template.loader import render_to_string
from django.utils import timezone
from .utils import CardEncryption
import uuid
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not extra_fields.get('first_name'):
            raise ValueError("First name is required")
        if not extra_fields.get('last_name'):
            raise ValueError("Last name is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_verified', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]

    username = None
    uuid = models.UUIDField(editable=False, unique=True, default=uuid.uuid4)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    terms_accepted = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, null=True, blank=True)
    reset_password_token = models.CharField(max_length=100, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    created_at = models.DateTimeField(auto_now_add=True)  # Add this field
    updated_at = models.DateTimeField(auto_now=True)   
    
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='custom_user_set',  # Changed from 'user_set'
        related_query_name='custom_user'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_set',  # Changed from 'user_set'
        related_query_name='custom_user'
    )


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['role']),
        ]

    @property
    def is_admin(self):
        return self.role == 'admin'

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()
        if self.is_superuser:
            self.role = 'admin'
        super().save(*args, **kwargs)

    def generate_verification_code(self):
        import random
        code = ''.join(random.choices('0123456789', k=6))
        self.verification_code = code
        self.save()
        return code

    def send_verification_email(self):
        code = self.generate_verification_code()
        
        html_content = render_to_string(
            'emails/verification_email.html',
            {
                'verification_code': code,
                'name': f"{self.first_name} {self.last_name}",
                'current_year': timezone.now().year
            }
        )

        email = EmailMessage(
            'Verify Your Account',
            html_content,
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
        )
        email.content_subtype = 'html'
        email.send(fail_silently=False)

    def verify_email(self, code):
        if self.verification_code == code:
            self.is_verified = True
            self.verification_code = None
            self.save()
            return True
        return False
    

    def send_reset_password_email(self):
        token = default_token_generator.make_token(self)
        self.reset_password_token = token
        self.save()

        password_reset_url = (f"{settings.FRONTEND_URL}/reset-password?token"
                          f"={token}&email={urlsafe_base64_encode(force_bytes(self.email))}")

        # Prepare HTML content for the email
        html_content = render_to_string(
            'emails/password_reset.html',
            {
                'password_reset_url': password_reset_url,
                'name': f"{self.first_name} {self.last_name}",
                'current_year': timezone.now().year
            }
        )

        # Create the email message
        email = EmailMessage(
            'Reset Your Password',
            html_content,
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
        )
        email.content_subtype = 'html'
        email.send(fail_silently=False)

    def verify_reset_token(self, token):
        if self.reset_password_token == token:
            return True
        return False


class RefreshUserToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='refresh_tokens')
    access_token = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    revoked = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['access_token']),
            models.Index(fields=['token']),
        ]

    def __str__(self):
        return f"Token for {self.user.email} (Revoked: {self.revoked})"
    
    @classmethod
    def create_token_pair(cls, user, refresh_token, access_token, lifetime):
        """
        Create a new token pair entry
        """
        return cls.objects.create(
            user=user,
            token=str(refresh_token),
            access_token=str(access_token),
            expires_at=timezone.now() + lifetime
        )

    def revoke(self):
        """
        Revoke the refresh token
        """
        self.revoked = True
        self.save()

    @classmethod
    def get_valid_token(cls, token):
        """
        Get a valid token instance
        """
        try:
            return cls.objects.get(
                token=token,
                expires_at__gt=timezone.now(),
                revoked=False
            )
        except cls.DoesNotExist:
            return None

class Address(models.Model):
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'addresses'

    def __str__(self):
        return f"{self.street_address}, {self.city}, {self.state} {self.postal_code}"

class UserProfile(models.Model):
    EMPLOYMENT_STATUS_CHOICES = [
        ('employed', 'Employed'),
        ('self_employed', 'Self Employed'),
        ('unemployed', 'Unemployed'),
        ('retired', 'Retired')
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='profile',
        primary_key=True  # This ensures one-to-one relationship at database level
    )
    phone_number = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2)
    employment_status = models.CharField(
        max_length=20, 
        choices=EMPLOYMENT_STATUS_CHOICES,
        db_index=True  # Add index for faster queries
    )
    employer_name = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        help_text="Required if employment status is employed or self-employed"
    )
    job_title = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        help_text="Required if employment status is employed or self-employed"
    )
    address = models.OneToOneField(
        Address, 
        on_delete=models.PROTECT,  # Prevent address deletion if still referenced
        related_name='user_profile'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['employment_status']),
            models.Index(fields=['created_at']),
        ]

    def clean(self):
        # Add model-level validation
        if self.employment_status in ['employed', 'self_employed']:
            if not self.employer_name:
                raise ValidationError({
                    'employer_name': 'Employer name is required for employed status'
                })
            if not self.job_title:
                raise ValidationError({
                    'job_title': 'Job title is required for employed status'
                })

    def save(self, *args, **kwargs):
        self.full_clean()  # Run model validation before saving
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Profile for {self.user.email}"
    

class CreditCard(models.Model):
    CARD_TYPES = [
        ('visa', 'Visa'),
        ('mastercard', 'Mastercard'),
        ('verve', 'Verve'),
        ('amex', 'American Express'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='credit_cards')
    card_type = models.CharField(max_length=20, choices=CARD_TYPES)
    _card_number = models.TextField(db_column='card_number')
    _cvc = models.TextField(db_column='cvc')
    expiry_month = models.IntegerField()
    expiry_year = models.IntegerField()
    name_on_card = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'is_default']),
        ]

    @property
    def _get_encryption(self):
        if not hasattr(self, '_encryption_instance'):
            self._encryption_instance = CardEncryption()
        return self._encryption_instance

    @property
    def card_number(self):
        return self._get_encryption.decrypt(self._card_number) if self._card_number else None

    @card_number.setter
    def card_number(self, value):
        self._card_number = self._get_encryption.encrypt(value) if value else None

    @property
    def cvc(self):
        return self._get_encryption.decrypt(self._cvc) if self._cvc else None

    @cvc.setter
    def cvc(self, value):
        self._cvc = self._get_encryption.encrypt(value) if value else None

    def __str__(self):
        card_num = self.card_number
        if card_num:
            return f"{self.card_type} card ending in {card_num[-4:]}"
        return f"{self.card_type} card"

    def save(self, *args, **kwargs):
        if self.is_default:
            # Set all other cards of this user to not default
            CreditCard.objects.filter(user=self.user).update(is_default=False)
        super().save(*args, **kwargs)

    def mask_card_number(self):
        """Returns a masked version of the card number"""
        card_num = self.card_number
        if card_num:
            return f"{'*' * (len(card_num)-4)}{card_num[-4:]}"
        return None