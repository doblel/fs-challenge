class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'S3CR3T!'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:admin@localhost/fs-challenge'


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    TESTING = True


class TestingConfig(Config):
    TESTING = True
