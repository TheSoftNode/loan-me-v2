import socket
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.db import transaction
from django.utils.http import urlsafe_base64_decode
import logging
from django.core.exceptions import ValidationError, ObjectDoesNotExist
logger = logging.getLogger(__name__)


from .models import RefreshUserToken, CustomUser, CreditCard, UserProfile
from .serializers import (
    UserSerializer,
    VerificationSerializer,
    PasswordResetRequestSerializer, 
    PasswordResetConfirmSerializer,
    UserProfileSerializer,
    CreditCardSerializer,
    UserDetailSerializer
)
from .permissions import IsAuthenticatedAndAdmin
import users.schemas as schemas

@schemas.signup_auto_schema
@api_view(['POST'])
def signup(request):
    with transaction.atomic():
        email = request.data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response(
                {"error": "User with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        is_first_user = CustomUser.objects.count() == 0
        
        # Prepare data for serializer
        data = request.data.copy()
        if is_first_user:
            data['role'] = 'admin'  # Add role to the data
        
        serializer = UserSerializer(data=data, context={'is_first_user': is_first_user})
        
        # serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        user = serializer.save()

        try:
            # Send verification email
            user.send_verification_email()

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Store refresh token
            RefreshUserToken.create_token_pair(
                user=user,
                refresh_token=refresh_token,
                access_token=access_token,
                lifetime=refresh.lifetime
            )

            return Response({
                'status': 'success',
                'access': access_token,
                'refresh': refresh_token,
                'user': UserSerializer(user).data,
                'message': 'Please check your email for verification code'
            }, status=status.HTTP_201_CREATED)

        except socket.gaierror:
            raise ValueError("Mail service not available")

@schemas.verify_email_auto_schema
@api_view(['POST'])
def verify_email(request):
    serializer = VerificationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=serializer.validated_data['email'])

        if user.is_verified:
            return Response(
                {'error': 'Email is already verified'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if user.verify_email(serializer.validated_data['code']):
            return Response({'message': 'Email verified successfully'})
        return Response(
            {'error': 'Invalid verification code'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except CustomUser.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )

@schemas.resend_verification_auto_schema
@api_view(['POST'])
def resend_verification(request):
    email = request.data.get('email')
    if not email:
        return Response(
            {'error': 'Email is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = CustomUser.objects.get(email=email)

        if not user:
            return Response(
                {'error': "A user with this email does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if user.is_verified:
            return Response(
                {'error': 'User is already verified'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user.send_verification_email()
            return Response({
                'status': 'success',
                'message': 'New verification code has been sent to your email'
            })
        except socket.gaierror:
            return Response(
                {'error': 'Email service not available. Please try again later'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
            
    except CustomUser.DoesNotExist:
        return Response(
            {'error': 'No user found with this email'},
            status=status.HTTP_404_NOT_FOUND
        )

@schemas.login_auto_schema
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = CustomUser.objects.get(email=email)
        if not user.check_password(password):
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        warning = "" if user.is_verified else "Account not verified"

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Store refresh token
        RefreshUserToken.create_token_pair(
            user=user,
            refresh_token=refresh_token,
            access_token=access_token,
            lifetime=refresh.lifetime
        )

        return Response({
            'status': 'success',
            'access': access_token,
            'refresh': refresh_token,
            'user': UserSerializer(user).data,
            'warning': warning
        })

    except CustomUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

@schemas.request_password_reset_auto_schema
@api_view(['POST'])
def request_password_reset(request):
    serializer = PasswordResetRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=serializer.validated_data['email'])
        user.send_reset_password_email()
        return Response({'message': 'Password reset email sent'})
    except CustomUser.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )

@schemas.reset_password_auto_schema
@api_view(['POST'])
def reset_password(request):
    token = request.data.get("token")
    email_encoded = request.data.get("email")
    new_password = request.data.get("new_password")

    if not token or not email_encoded:
        return Response(
            {'error': 'Invalid link'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    email = urlsafe_base64_decode(email_encoded).decode()
    serializer = PasswordResetConfirmSerializer(data={
        'email': email, 
        'token': token, 
        'new_password': new_password
    })

    if serializer.is_valid():
        try:
            user = CustomUser.objects.get(
                email=email,
                reset_password_token=token
            )

            user.set_password(new_password)
            user.reset_password_token = None
            user.save()
            return Response({'message': 'Password reset successful'})
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'Invalid token'},
                status=status.HTTP_400_BAD_REQUEST
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@schemas.logout_auto_schema
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        RefreshUserToken.objects.filter(user=request.user).delete()
        return Response({'message': 'Logged out successfully'})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.me_auto_schema
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def me(request):
    try:
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    
@schemas.token_refresh_auto_schema
@api_view(['POST'])
def token_refresh(request):
    try:
        access_token = request.data.get('access_token')
        # refresh_token = request.data.get('refresh_token')

        if not access_token:
            return Response(
                {'error': 'Both access_token and refresh_token are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find the token pair
        refresh_token_obj = RefreshUserToken.objects.filter(
            access_token=access_token,
            # token=refresh_token,
            revoked=False,
            expires_at__gt=timezone.now()
        ).first()

        if not refresh_token_obj:
            return Response(
                {'error': 'Invalid token pair'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate new access token
        refresh = RefreshToken(refresh_token_obj.token)
        new_access_token = str(refresh.access_token)

        # Update stored token pair
        refresh_token_obj.access_token = new_access_token
        refresh_token_obj.expires_at = timezone.now() + refresh.lifetime
        refresh_token_obj.save()

        return Response({
            'access': new_access_token,
            'message': 'Token refreshed successfully'
        })

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

# @schemas.token_refresh_auto_schema
# @api_view(['POST'])
# def token_refresh(request):
#     try:
#         expired_access_token = request.data.get('access_token')
#         if not expired_access_token:
#             return Response(
#                 {'error': 'Access token is required'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         refresh_token_obj = RefreshUserToken.objects.filter(
#             access_token=expired_access_token,
#             revoked=False,
#             expires_at__gt=timezone.now()
#         ).first()

#         if not refresh_token_obj:
#             return Response(
#                 {'error': 'No valid refresh token found'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         refresh = RefreshToken(refresh_token_obj.token)
#         new_access_token = str(refresh.access_token)

#         # Update stored token
#         refresh_token_obj.access_token = new_access_token
#         refresh_token_obj.expires_at = timezone.now() + refresh.lifetime
#         refresh_token_obj.save()

#         return Response({'access': new_access_token})

#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=status.HTTP_400_BAD_REQUEST
#         )
    



## Profiles
@schemas.get_profile_schema
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_profile(request):
    try:
        profile = request.user.profile
        serializer = UserProfileSerializer(profile)
        return Response({'profile': serializer.data})
    except UserProfile.DoesNotExist:
        return Response(
            {'error': 'Profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error fetching profile for user {request.user.id}: {str(e)}")
        return Response(
            {'error': 'An error occurred while fetching the profile'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.create_profile_schema
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_profile(request):
    logger.info(f"Creating profile for user {request.user.id}")
    
    try:
        # Check if profile already exists
        if hasattr(request.user, 'profile'):
            return Response(
                {'error': 'Profile already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = UserProfileSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            with transaction.atomic():
                profile = serializer.save()
                logger.info(f"Profile created successfully for user {request.user.id}")
                return Response({
                    'message': 'Profile created successfully',
                    'profile': UserProfileSerializer(profile).data
                }, status=status.HTTP_201_CREATED)
        
        logger.error(f"Validation error: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Error creating profile: {str(e)}")
        return Response(
            {'error': 'An error occurred while creating the profile'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.update_profile_schema
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request):
    logger.info(f"Updating profile for user {request.user.id}")
    
    try:
        profile = request.user.profile
        serializer = UserProfileSerializer(
            profile,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            with transaction.atomic():
                profile = serializer.save()
                logger.info(f"Profile updated successfully for user {request.user.id}")
                return Response({
                    'message': 'Profile updated successfully',
                    'profile': UserProfileSerializer(profile).data
                })
        
        logger.error(f"Validation error: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ObjectDoesNotExist:
        logger.error(f"Profile not found for user {request.user.id}")
        return Response(
            {'error': 'Profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        return Response(
            {'error': 'An error occurred while updating the profile'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.get_credit_cards_schema
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_credit_cards(request):
    try:
        cards = CreditCard.objects.filter(user=request.user)
        serializer = CreditCardSerializer(cards, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching credit cards for user {request.user.id}: {str(e)}")
        return Response(
            {'error': 'An error occurred while fetching credit cards'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.add_credit_card_schema
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_credit_card(request):
    try:
        with transaction.atomic():
            serializer = CreditCardSerializer(data=request.data)
            if serializer.is_valid():
                card = serializer.save(user=request.user)
                # Return masked data
                return Response(
                    CreditCardSerializer(card).data,
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f"Error adding credit card for user {request.user.id}: {str(e)}")
        return Response(
            {'error': 'An error occurred while adding the credit card'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.update_credit_card_schema
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_credit_card(request, card_id):
    try:
        with transaction.atomic():
            card = CreditCard.objects.get(id=card_id, user=request.user)
            serializer = CreditCardSerializer(card, data=request.data, partial=True)
            if serializer.is_valid():
                updated_card = serializer.save()
                return Response(CreditCardSerializer(updated_card).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except CreditCard.DoesNotExist:
        return Response(
            {'error': 'Credit card not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except ValidationError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f"Error updating credit card {card_id} for user {request.user.id}: {str(e)}")
        return Response(
            {'error': 'An error occurred while updating the credit card'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.delete_credit_card_schema
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_credit_card(request, card_id):
    try:
        with transaction.atomic():
            card = CreditCard.objects.get(id=card_id, user=request.user)
            card.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except CreditCard.DoesNotExist:
        return Response(
            {'error': 'Credit card not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error deleting credit card {card_id} for user {request.user.id}: {str(e)}")
        return Response(
            {'error': 'An error occurred while deleting the credit card'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.set_default_card_schema 
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def set_default_card(request, card_id):
    try:
        with transaction.atomic():
            card = CreditCard.objects.get(id=card_id, user=request.user)
            card.is_default = True
            card.save()
            return Response(CreditCardSerializer(card).data)
    except CreditCard.DoesNotExist:
        return Response(
            {'error': 'Credit card not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error setting default card {card_id} for user {request.user.id}: {str(e)}")
        return Response(
            {'error': 'An error occurred while setting the default card'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
@schemas.get_user_details_schema
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    """Get details for the currently logged-in user"""
    try:
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching user details: {str(e)}")
        return Response(
            {'error': 'An error occurred while fetching user details'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.get_all_users_schema
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticatedAndAdmin])
def get_all_users_details(request):
    """Get details for all users (admin only)"""
    try:
        users = CustomUser.objects.all()
        serializer = UserDetailSerializer(users, many=True)
        return Response({
            'count': users.count(),
            'users': serializer.data
        })
    except Exception as e:
        logger.error(f"Error fetching all users details: {str(e)}")
        return Response(
            {'error': 'An error occurred while fetching users details'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@schemas.get_specific_user_schema
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticatedAndAdmin])
def get_specific_user_details(request, user_id):
    """Get details for a specific user (admin only)"""
    try:
        user = CustomUser.objects.get(id=user_id)
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)
    except CustomUser.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error fetching specific user details: {str(e)}")
        return Response(
            {'error': 'An error occurred while fetching user details'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )