# utils.py
from cryptography.fernet import Fernet
from django.conf import settings
from base64 import b64encode

class CardEncryption:
    def __init__(self):
        # Use your Django SECRET_KEY or a dedicated encryption key
        key = b64encode(settings.SECRET_KEY.encode()[:32].ljust(32, b' '))
        self.cipher_suite = Fernet(key)

    def encrypt(self, data):
        if not data:
            return None
        return self.cipher_suite.encrypt(str(data).encode()).decode()

    def decrypt(self, encrypted_data):
        if not encrypted_data:
            return None
        return self.cipher_suite.decrypt(encrypted_data.encode()).decode()