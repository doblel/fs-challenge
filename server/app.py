from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from .config import DevelopmentConfig
from .extensions import db
from .accounts import AccountsResource

def create_app(configurationObject):
    app = Flask(__name__)
    app.config.from_object(configurationObject)

    # init extensions
    with app.app_context():
        db.init_app(app)

    return app

app = create_app(DevelopmentConfig)

CORS(app)

api = Api(app, prefix='/api')
api.add_resource(AccountsResource, '/accounts', '/accounts/<int:account_id>')

@app.route('/')
def index():
    return 'All resources are exposed under /api prefix'
