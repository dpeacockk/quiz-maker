"""quizmaker development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'#\xfadL\xf3\xf6x8\xd4\xff*3\xb2\xb4_\xc6n\x02=\xd4\xb2\xe5)\xb4'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
QUIZMAKER_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = QUIZMAKER_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024