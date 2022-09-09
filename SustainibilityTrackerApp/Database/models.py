from peewee import *

database = SqliteDatabase('SustainibilityTrackerApp\Database\database.db')

class UnknownField(object):
    def __init__(self, *_, **__): pass

class BaseModel(Model):
    class Meta:
        database = database

class User(BaseModel):
    email = TextField(null=True, primary_key=True)
    name = TextField(null=True)
    password = TextField(null=True)
    phone = TextField(null=True)

    class Meta:
        table_name = 'User'
        