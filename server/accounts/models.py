from ..extensions import db


class Account(db.Model):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, email=None):
        self.email = email

    def __repr__(self):
        return f'<Account {self.email}>'
