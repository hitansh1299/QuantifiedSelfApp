import json
from peewee import *
from Database.models import User
from Database.models import Tracker
from Database.models import Logs
from Database.models import Database
from playhouse.dataset import DataSet


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

'''
    returns:
    Returns a  list of trackers, each tracker is a dict of type
    '''
def _getTrackers(user) -> list:
    trackers = Tracker.select(Tracker.id, Tracker.tracker, Tracker.last_updated).where(Tracker.user == user)
    # res = []
    # for t in trackers:
    #     x = json.loads(t.tracker)
    #     x['last_updated'] = t.last_updated
    #     res.append(x)
    # return res\
    trackers = [(json.loads(t.tracker) | {'last_updated':t.last_updated} | {'id':t.id}) for t in trackers]
    return trackers

def _getLogs(tracker_id):
    logs = Logs.select().where(Logs.tracker == tracker_id)
    logs = [{'id': l.id, 'tracker':l.tracker, 'datetime':l.datetime, 'note': l.note, 'value':l.value} for l in logs]
    return logs

def createLog(tracker_id, datetime, note, value):
    Logs.create(
        tracker=tracker_id,
        datetime=datetime,
        note=note,
        value=value
    )

def _editDate(id, new_datetime):
    print('Updating date: ')
    print(id, new_datetime)
    Logs.update(datetime=new_datetime).where(Logs.id == id).execute()

def _editNote(id, new_note):
    print('Updating note: ')
    print(id, new_note)
    Logs.update(note=new_note).where(Logs.id == id).execute()

def _deleteLog(id):
    print('Deleting Log: ')
    Logs.delete().where(Logs.id == id).execute()

def getCSV(tracker_id):
    q = Logs.select(Logs.datetime, Logs.value, Logs.note).where(Logs.tracker == tracker_id)
    print(q.tuples())
    DataSet(r'sqlite:///SustainibilityTrackerApp\Database\database.db').freeze(q, format='csv', filename='logs.csv')
    with open("logs.csv") as fp:
        return fp.read()

def _deleteTracker(tracker_id):
    Tracker.delete().where(Tracker.id == tracker_id).execute()