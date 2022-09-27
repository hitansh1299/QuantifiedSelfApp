from peewee import *
from Database.models import User
from Database.models import Tracker
def print_users():
    print([x for x in User.select()])
    pass  

def get_user_by_email(email: str):
    return User.get_by_id(email)

def createNewTracker(
    user: str,
    tracker: str
):
    Tracker.create(
        tracker=tracker,
        user=user
    )
