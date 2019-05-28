from flask_restful import HTTPException

api_errors = {
    'AccountNotFoundException': {
        'message': "An account with that ID no longer exists.",
        'status': 410,
    },
    'EmailAlreadyInUseException': {
        'message': "Email already in use, please take another.",
        'status': 400,
    },
    'EmailRequiredException': {
        'message': "Email is required.",
        'status': 400,
    },
}


class AccountNotFoundException(HTTPException):
    pass


class EmailRequiredException(HTTPException):
    pass


class EmailAlreadyInUseException(HTTPException):
    pass
