from rest_framework import serializers
from users.models import CustomUser
from .models import CreditCard, UserProfile, Address
import re
import logging
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils import timezone


logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    terms_accepted = serializers.BooleanField()

    class Meta:
        model = CustomUser
        fields = [
            'uuid', 'email', 'password', 'confirm_password', 
            'first_name', 'last_name', 'terms_accepted',
            'is_verified', 'role'
        ]
        extra_kwargs = {
            'uuid': {'read_only': True},
            'is_verified': {'read_only': True},
            'role': {'read_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        if not data['terms_accepted']:
            raise serializers.ValidationError("You must accept the terms and conditions")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        # Send verification email
        user.send_verification_email()
        return user

class VerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate_code(self, value):
        if not value.isdigit() or len(value) != 6:
            raise serializers.ValidationError("Invalid verification code format")
        return value
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class TokenRefreshSerializer(serializers.Serializer):
    access_token = serializers.CharField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)


class CreditCardSerializer(serializers.ModelSerializer):
    card_number = serializers.CharField(max_length=16, write_only=True)
    cvc = serializers.CharField(max_length=4, write_only=True)
    masked_card_number = serializers.SerializerMethodField()

    class Meta:
        model = CreditCard
        fields = [
            'id', 'card_type', 'card_number', 'cvc', 'masked_card_number',
            'expiry_month', 'expiry_year', 'name_on_card', 'is_default'
        ]
        read_only_fields = ['id']

    def get_masked_card_number(self, obj):
        return obj.mask_card_number()

    def validate_card_number(self, value):
        # Remove any spaces or dashes
        value = re.sub(r'[\s-]', '', value)
        
        # Check if it's numeric
        if not value.isdigit():
            raise serializers.ValidationError("Card number must contain only digits")
        
        # Check length based on card type
        card_type = self.initial_data.get('card_type')
        if card_type == 'amex' and len(value) != 15:
            raise serializers.ValidationError("American Express cards must be 15 digits")
        elif card_type in ['visa', 'mastercard', 'verve'] and len(value) != 16:
            raise serializers.ValidationError("Card number must be 16 digits")
        
        # Luhn algorithm validation
        if not self.luhn_check(value):
            raise serializers.ValidationError("Invalid card number")
        
        return value

    def validate_cvc(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("CVC must contain only digits")
        
        card_type = self.initial_data.get('card_type')
        if card_type == 'amex' and len(value) != 4:
            raise serializers.ValidationError("American Express CVC must be 4 digits")
        elif card_type in ['visa', 'mastercard'] and len(value) != 3:
            raise serializers.ValidationError("CVC must be 3 digits")
        
        return value

    def validate(self, data):
        # Add expiry date validation
        if data.get('expiry_year') < timezone.now().year:
            raise serializers.ValidationError("Card has expired")
        if (data.get('expiry_year') == timezone.now().year and 
            data.get('expiry_month') < timezone.now().month):
            raise serializers.ValidationError("Card has expired")
        return data

    @staticmethod
    def luhn_check(card_number):
        """
        Implement the Luhn algorithm for card number validation
        """
        digits = [int(d) for d in str(card_number)]
        odd_digits = digits[-1::-2]
        even_digits = digits[-2::-2]
        checksum = sum(odd_digits)
        for d in even_digits:
            checksum += sum(divmod(d * 2, 10))
        return checksum % 10 == 0



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street_address', 'city', 'state', 'postal_code', 'country']

class UserProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = UserProfile
        fields = [
            'phone_number', 'date_of_birth', 'monthly_income',
            'employment_status', 'employer_name', 'job_title', 'address'
        ]

    def create(self, validated_data):
        try:
            with transaction.atomic():
                address_data = validated_data.pop('address')
                address = Address.objects.create(**address_data)
                profile = UserProfile.objects.create(
                    user=self.context['request'].user,
                    address=address,
                    **validated_data
                )
                return profile
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)

    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        if address_data:
            address_serializer = AddressSerializer(instance.address, data=address_data)
            address_serializer.is_valid(raise_exception=True)
            address_serializer.save()

        return super().update(instance, validated_data)

class UserDetailSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    credit_cards = CreditCardSerializer(many=True)
    
    class Meta:
        model = CustomUser
        fields = [
            'uuid', 'email', 'first_name', 'last_name',
            'is_verified', 'role', 'created_at', 'profile',
            'credit_cards'
        ]
        read_only_fields = fields