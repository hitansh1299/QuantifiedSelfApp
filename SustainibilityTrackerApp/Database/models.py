from peewee import *

database = SqliteDatabase('SustainibilityTrackerApp\Database\database.db')

class UnknownField(object):
    def __init__(self, *_, **__): pass

class BaseModel(Model):
    class Meta:
        database = database

class Tracker(BaseModel):
    last_updated = TextField(null=True)
    tracker = TextField()
    user = TextField()

    class Meta:
        table_name = 'Tracker'

class User(BaseModel):
    id = TextField(primary_key=True)
    name = TextField()
    password = TextField()

    class Meta:
        table_name = 'User'

class SqliteSequence(BaseModel):
    name = BareField(null=True)
    seq = BareField(null=True)

    class Meta:
        table_name = 'sqlite_sequence'
        primary_key = False

