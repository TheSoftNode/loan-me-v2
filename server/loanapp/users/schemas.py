from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

user_properties = {
    'uuid': openapi.Schema(type=openapi.TYPE_STRING, description='User UUID'),
    'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
    'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='User first name'),
    'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='User last name'),
    'is_verified': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Email verification status'),
    'role': openapi.Schema(type=openapi.TYPE_STRING, description='User role')
}


error_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message'),
    }
)

success_message_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message'),
    }
)

success_password_reset = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message'),
        'reset_password_token': openapi.Schema(type=openapi.TYPE_STRING, description='Password reset token'),
    }
)


signup_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'password', 'confirm_password', 'first_name', 'last_name', 'terms_accepted'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
            'confirm_password': openapi.Schema(type=openapi.TYPE_STRING, description='Confirm password'),
            'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='User first name'),
            'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='User last name'),
            'terms_accepted': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Terms and conditions acceptance'),
        }
    ),
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'access': openapi.Schema(type=openapi.TYPE_STRING, description='Access token'),
                'refresh': openapi.Schema(type=openapi.TYPE_STRING, description="Refresh token"),
                'user': openapi.Schema(type=openapi.TYPE_OBJECT, properties=user_properties),
                'message': openapi.Schema(type=openapi.TYPE_STRING, description='Verification instructions'),
            }
        ),
        400: error_response,
    }
)

verify_email_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'code'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
            'code': openapi.Schema(type=openapi.TYPE_STRING, description='6-digit verification code'),
        }
    ),
    responses={
        200: success_message_response,
        400: error_response,
        404: error_response,
    },
    operation_description="Verify user email address using the verification code",
)

resend_verification_auto_schema = swagger_auto_schema(
    method='post',
    operation_description="Resend verification code to user's email address",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email'],
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_STRING, 
                description='Email address of the user'
            ),
        }
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'status': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Status of the request'
                ),
                'message': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Success message'
                ),
            }
        ),
        400: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Error message for invalid request or already verified user'
                ),
            }
        ),
        404: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Error message when user not found'
                ),
            }
        ),
        503: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Error message when email service is unavailable'
                ),
            }
        ),
        500: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Error message for server errors'
                ),
            }
        ),
    }
)

login_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'password'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
        }
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'status': openapi.Schema(type=openapi.TYPE_STRING, description='Status of the request'),
                'access': openapi.Schema(type=openapi.TYPE_STRING, description='Access token'),
                'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Refresh token'),
                'user': openapi.Schema(type=openapi.TYPE_OBJECT, properties=user_properties),
                'warning': openapi.Schema(type=openapi.TYPE_STRING, description='Account verification status'),
            }
        ),
        401: error_response,
        404: error_response,
    },
    operation_description="Authenticate user and retrieve tokens",
)

request_password_reset_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
        }
    ),
    responses={
        200: success_password_reset,
        404: error_response,
        400: error_response,
    },
    operation_description="Request a password reset token via email",
)

reset_password_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'token', 'new_password'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
            'token': openapi.Schema(type=openapi.TYPE_STRING, description='Password reset token received via email'),
            'new_password': openapi.Schema(type=openapi.TYPE_STRING, description='New password'),
        }
    ),
    responses={
        200: success_message_response,
        400: error_response,
    },
    operation_description="Reset password using the token received via email",
)

change_password_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['old_password', 'new_password'],
        properties={
            'old_password': openapi.Schema(type=openapi.TYPE_STRING, description='Current password'),
            'new_password': openapi.Schema(type=openapi.TYPE_STRING, description='New password'),
        }
    ),
    responses={
        200: success_message_response,
        400: error_response,
        401: 'Authentication credentials were not provided',
    },
    operation_description="Change password for authenticated user",
)

token_refresh_auto_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['access_token'],
        properties={
            'access_token': openapi.Schema(type=openapi.TYPE_STRING, description='Expired access token'),
            'refresh_token': openapi.Schema(type=openapi.TYPE_STRING, description='Valid refresh token'),
        }
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'access': openapi.Schema(type=openapi.TYPE_STRING, description='New access token'),
            }
        ),
        400: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message'),
            }
        ),
    },
    operation_description="Refresh access token using the refresh token",
)

logout_auto_schema = swagger_auto_schema(
    method='post',
    operation_description="Logout the authenticated user by deleting or revoking their active refresh token.",
    responses={
        200: openapi.Response(
            description="Successfully logged out",
            # examples={"application/json": {"message": "Logged out successfully"}}
        ),
        401: openapi.Response(
            description="Authentication credentials were not provided."
        ),
    },
)

me_auto_schema = swagger_auto_schema(
    method='get',
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'uuid': openapi.Schema(type=openapi.TYPE_STRING, description='User UUID'),
                        'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
                        'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='User first name'),
                        'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='User last name'),
                        'is_verified': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Email verification status'),
                        'role': openapi.Schema(
                            type=openapi.TYPE_STRING, 
                            description='User role',
                            enum=['user', 'admin']
                        )
                    }
                ),
            }
        ),
        401: 'Authentication credentials were not provided',
    },
    operation_description="Retrieve data of the currently logged-in user",
)
# Get All Users Endpoint Swagger Schema
get_all_users_schema = swagger_auto_schema(
    method='get',
    operation_description="Retrieve all users (Admin only)",
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=user_properties
            ),
            description='List of all users'
        ),
        403: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Access denied message')
            },
            description='Unauthorized access attempt'
        )
    }
)

# Update User Role Endpoint Swagger Schema
update_user_role_schema = swagger_auto_schema(
    method='patch',
    operation_description="Update user role (Admin only)",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'role'],
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='User email to update'
            ),
            'role': openapi.Schema(
                type=openapi.TYPE_STRING, 
                description='New user role',
                enum=['user', 'admin']
            )
        }
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=user_properties,
            description='Updated user details'
        ),
        400: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Invalid role or missing data error')
            },
            description='Invalid role or missing data provided'
        ),
        403: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Access denied message')
            },
            description='Unauthorized access attempt'
        ),
        404: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='User not found error')
            },
            description='User not found'
        )
    }
)

# Delete All Users Endpoint Swagger Schema
delete_all_users_schema = swagger_auto_schema(
    method='delete',
    operation_description="Delete all users except the current user (Admin only)",
    responses={
        204: openapi.Response(description='All users deleted successfully'),
        403: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Access denied message')
            },
            description='Unauthorized access attempt'
        )
    }
)

delete_user_schema = swagger_auto_schema(
    method='delete',
    operation_description="Delete a specific user by ID (Admin only)",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email'],
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Email of the user to delete'
            )
        }
    ),
    responses={
        204: openapi.Response(description='User deleted successfully'),
        400: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Cannot delete own account error')
            },
            description='Attempt to delete own account'
        ),
        403: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Access denied message')
            },
            description='Unauthorized access attempt'
        ),
        404: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='User not found error')
            },
            description='User not found'
        )
    }
)

get_user_schema = swagger_auto_schema(
    method='post',
    operation_description="Retrieve a specific user by ID",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email'],
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Email of the user to retrieve'
            )
        }
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=user_properties,
            description='User details'
        ),
        400: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Invalid request error')
            },
            description='Request error'
        ),
        404: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='User not found error')
            },
            description='User not found'
        )
    }
)


# profiles

address_properties = {
    'street_address': openapi.Schema(type=openapi.TYPE_STRING),
    'city': openapi.Schema(type=openapi.TYPE_STRING),
    'state': openapi.Schema(type=openapi.TYPE_STRING),
    'postal_code': openapi.Schema(type=openapi.TYPE_STRING),
    'country': openapi.Schema(type=openapi.TYPE_STRING),
}

profile_properties = {
    'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
    'date_of_birth': openapi.Schema(type=openapi.TYPE_STRING, format='date'),
    'monthly_income': openapi.Schema(type=openapi.TYPE_NUMBER),
    'employment_status': openapi.Schema(
        type=openapi.TYPE_STRING,
        enum=['employed', 'self_employed', 'unemployed', 'retired']
    ),
    'employer_name': openapi.Schema(type=openapi.TYPE_STRING),
    'job_title': openapi.Schema(type=openapi.TYPE_STRING),
    'address': openapi.Schema(type=openapi.TYPE_OBJECT, properties=address_properties),
}

credit_card_properties = {
    'id': openapi.Schema(type=openapi.TYPE_STRING, format='uuid'),
    'card_type': openapi.Schema(
        type=openapi.TYPE_STRING,
        enum=['visa', 'mastercard', 'amex'],
        description='Type of credit card'
    ),
    'card_number': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Full card number (write-only)',
        write_only=True,
        min_length=15,
        max_length=16
    ),
    'cvc': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Card verification code (write-only)',
        write_only=True,
        min_length=3,
        max_length=4
    ),
    'masked_card_number': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Masked card number (read-only)',
        read_only=True
    ),
    'expiry_month': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Card expiry month (1-12)',
        minimum=1,
        maximum=12
    ),
    'expiry_year': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Card expiry year (4-digit)',
        minimum=2000,
        maximum=2100
    ),
    'name_on_card': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Name as it appears on the card',
        max_length=255
    ),
    'is_default': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Whether this is the default card'
    ),
    'created_at': openapi.Schema(
        type=openapi.TYPE_STRING,
        format='date-time',
        description='When the card was added',
        read_only=True
    ),
    'updated_at': openapi.Schema(
        type=openapi.TYPE_STRING,
        format='date-time',
        description='When the card was last updated',
        read_only=True
    )
}

# Schema definitions for the views
get_profile_schema = swagger_auto_schema(
    method='get',
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'profile': openapi.Schema(type=openapi.TYPE_OBJECT, properties=profile_properties)
            }
        ),
        401: 'Authentication credentials were not provided',
    }
)

# schemas.py
create_profile_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['phone_number', 'date_of_birth', 'monthly_income', 
                 'employment_status', 'address'],
        properties=profile_properties
    ),
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'profile': openapi.Schema(
                    type=openapi.TYPE_OBJECT, 
                    properties=profile_properties
                ),
                'message': openapi.Schema(type=openapi.TYPE_STRING)
            }
        ),
        400: 'Bad Request',
        401: 'Authentication credentials were not provided',
    }
)

update_profile_schema = swagger_auto_schema(
    method='put',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties=profile_properties
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'profile': openapi.Schema(
                    type=openapi.TYPE_OBJECT, 
                    properties=profile_properties
                ),
                'message': openapi.Schema(type=openapi.TYPE_STRING)
            }
        ),
        400: 'Bad Request',
        401: 'Authentication credentials were not provided',
        404: 'Profile not found',
    }
)

get_credit_cards_schema = swagger_auto_schema(
    method='get',
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(type=openapi.TYPE_OBJECT, properties=credit_card_properties)
        ),
        401: 'Authentication credentials were not provided',
    }
)

add_credit_card_schema = swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties=credit_card_properties
    ),
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=credit_card_properties
        ),
        400: 'Bad Request',
        401: 'Authentication credentials were not provided',
    }
)

# Define common error responses
error_responses = {
    400: openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'error': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Error message'
            )
        }
    ),
    401: 'Authentication credentials were not provided',
    404: openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'error': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Credit card not found'
            )
        }
    ),
    500: openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'error': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Internal server error message'
            )
        }
    )
}

update_credit_card_schema = swagger_auto_schema(
    method='put',
    operation_description="Update an existing credit card. All fields are optional.",
    manual_parameters=[
        openapi.Parameter(
            'card_id',
            openapi.IN_PATH,
            description="UUID of the credit card to update",
            type=openapi.TYPE_STRING,
            format='uuid',
            required=True
        )
    ],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties=credit_card_properties
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=credit_card_properties
        ),
        **error_responses
    }
)

delete_credit_card_schema = swagger_auto_schema(
    method='delete',
    operation_description="Delete a credit card",
    manual_parameters=[
        openapi.Parameter(
            'card_id',
            openapi.IN_PATH,
            description="UUID of the credit card to delete",
            type=openapi.TYPE_STRING,
            format='uuid',
            required=True
        )
    ],
    responses={
        204: 'Credit card deleted successfully',
        **error_responses
    }
)

set_default_card_schema = swagger_auto_schema(
    method='put',
    operation_description="Set a credit card as the default payment method",
    manual_parameters=[
        openapi.Parameter(
            'card_id',
            openapi.IN_PATH,
            description="UUID of the credit card to set as default",
            type=openapi.TYPE_STRING,
            format='uuid',
            required=True
        )
    ],
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=credit_card_properties
        ),
        **error_responses
    }
)



# Reuse the profile properties we defined earlier
user_properties = {
    'uuid': openapi.Schema(type=openapi.TYPE_STRING, format='uuid'),
    'email': openapi.Schema(type=openapi.TYPE_STRING, format='email'),
    'first_name': openapi.Schema(type=openapi.TYPE_STRING),
    'last_name': openapi.Schema(type=openapi.TYPE_STRING),
    'is_verified': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    'role': openapi.Schema(type=openapi.TYPE_STRING, enum=['user', 'admin']),
    'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    'profile': openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties=profile_properties
    ),
    'credit_cards': openapi.Schema(
        type=openapi.TYPE_ARRAY,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'id': openapi.Schema(type=openapi.TYPE_STRING, format='uuid'),
                'card_type': openapi.Schema(type=openapi.TYPE_STRING),
                'masked_card_number': openapi.Schema(type=openapi.TYPE_STRING),
                'expiry_month': openapi.Schema(type=openapi.TYPE_INTEGER),
                'expiry_year': openapi.Schema(type=openapi.TYPE_INTEGER),
                'name_on_card': openapi.Schema(type=openapi.TYPE_STRING),
                'is_default': openapi.Schema(type=openapi.TYPE_BOOLEAN)
            }
        )
    )
}

get_user_details_schema = swagger_auto_schema(
    method = 'get',
    operation_description="Get details for the currently logged-in user",
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=user_properties
        ),
        401: 'Authentication credentials were not provided',
        500: 'Internal server error'
    }
)

get_all_users_schema = swagger_auto_schema(
    method='get',
    operation_description="Get details for all users (admin only)",
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'count': openapi.Schema(type=openapi.TYPE_INTEGER),
                'users': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=user_properties
                    )
                )
            }
        ),
        401: 'Authentication credentials were not provided',
        403: 'Permission denied',
        500: 'Internal server error'
    }
)

get_specific_user_schema = swagger_auto_schema(
    method='get',
    operation_description="Get details for a specific user (admin only)",
    manual_parameters=[
        openapi.Parameter(
            'user_id',
            openapi.IN_PATH,
            description="ID of the user to retrieve",
            type=openapi.TYPE_INTEGER,
            required=True
        )
    ],
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=user_properties
        ),
        401: 'Authentication credentials were not provided',
        403: 'Permission denied',
        404: 'User not found',
        500: 'Internal server error'
    }
)