from peewee import *
from Database.models import User

def print_users():
    print([x for x in User.select()])
    pass  

def get_user_by_email(email: str):
    return User.get_by_id(email)
