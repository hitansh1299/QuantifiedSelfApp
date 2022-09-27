from inspect import trace
import json
from peewee import *
from Database.models import User
from Database.models import Tracker
def print_users():
    print([x for x in User.select()])
    pass  

def get_user_by_email(email: str):
    return User.get_by_id(email)

def _createNewTracker(
    user: str,
    tracker: str
):
    Tracker.create(
        tracker=tracker,
        user=user
    )

def _getTrackers(user):
    trackers = Tracker.select(Tracker.tracker, Tracker.last_updated).where(Tracker.user == user)
    # res = []
    # for t in trackers:
    #     x = json.loads(t.tracker)
    #     x['last_updated'] = t.last_updated
    #     res.append(x)
    # return res\
    trackers = [(json.loads(t.tracker) | {'last_updated':t.last_updated}) for t in trackers]
    return trackers