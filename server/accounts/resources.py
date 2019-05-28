from flask_restful import Resource, fields, marshal, marshal_with, request

from ..extensions import db
from ..exceptions import EmailAlreadyInUseException, EmailRequiredException, AccountNotFoundException
from .models import Account

account_dto = {
    'id': fields.Integer,
    'email': fields.String
}


class AccountsResource(Resource):
    def get(self, account_id=None):
        if account_id:
            account = Account.query.get(account_id)
            if account is None:
                raise AccountNotFoundException()
                
            return marshal(account, account_dto), 200
        else:
            accounts = Account.query.all()
            return [marshal(acc, account_dto) for acc in accounts], 200

    @marshal_with(account_dto)
    def post(self):
        if not 'email' in request.json:
            raise EmailRequiredException()

        email = request.json['email']

        if Account.query.filter_by(email=email).first() is not None:
            raise EmailAlreadyInUseException()

        account = Account(email=email)

        db.session.add(account)
        db.session.commit()

        return marshal(account, account_dto), 201

    @marshal_with(account_dto)
    def put(self, account_id=None):
        account = Account.query.get(account_id)

        if 'email' in request.json:
            account.email = request.json['email']

        db.session.add(account)
        db.session.commit()

        return marshal(account, account_dto), 200   

    def delete(self, account_id=None):
        account = Account.query.get(account_id)

        db.session.delete(account)
        db.session.commit()

        return True, 204
