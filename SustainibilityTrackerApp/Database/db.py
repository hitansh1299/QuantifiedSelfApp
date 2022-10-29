import json
from peewee import *
from Database.models import User
from Database.models import Tracker
from Database.models import Logs
from Database.models import database
from playhouse.dataset import DataSet
from datetime import datetime, timedelta



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
    print('FETCHING LOGS!')
    trackers = Tracker.select(Tracker.id, Tracker.tracker, Tracker.last_updated).where(Tracker.user == user)
    trackers = [(json.loads(t.tracker) | {'last_updated':t.last_updated} | {'id':t.id}) for t in trackers]
    return trackers

def __get_unupdated_trackers__():
    return Tracker.select(Tracker.user, Tracker.id).where((Tracker.last_updated > str(datetime.now() - timedelta(days=1))) | (Tracker.last_updated.is_null()))
    
def get_reportable_trackers():
    return Tracker.select(Tracker.user, Tracker.id).where((Tracker.last_updated > str(datetime.now() - timedelta(days=30))))

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
    set_last_updated(tracker_id)

def _editDate(id, new_datetime):
    print('Updating date: ')
    print(id, new_datetime)
    Logs.update(datetime=new_datetime).where(Logs.id == id).execute()
    set_last_updated(id)

def _editNote(id, new_note):
    print('Updating note: ')
    print(id, new_note)
    Logs.update(note=new_note).where(Logs.id == id).execute()

def _deleteLog(id):
    print('Deleting Log: ')
    Logs.delete().where(Logs.id == id).execute()

def getCSV(tracker_id):
    # global database
    # print('DATABASE',database.get_tables())
    q = Logs.select(Logs.tracker, Logs.datetime, Logs.value, Logs.note).where(Logs.tracker == tracker_id)
    print(q.tuples())
    # database.close()
    DataSet(database).freeze(q, format='csv', filename=f'{tracker_id}_logs.csv')
    # database = SqliteDatabase(r'SustainibilityTrackerApp\Database\database.db')   
    with open(f'{tracker_id}_logs.csv', 'rb') as fp:
        return fp.read()

def _deleteTracker(tracker_id):
    Tracker.delete().where(Tracker.id == tracker_id).execute()

def set_last_updated(tracker_id, date=datetime.now()):
    print(tracker_id)
    Tracker.update(last_updated=date).where(Tracker.id == tracker_id).execute()


def getData(id):
    logs = _getLogs(id)
    title = json.loads(Tracker.get_by_id(id).tracker)['tracker_name']
    logs.sort(key=lambda x: x['datetime'])
    print(logs)
    d = {}
    type = 'choice'
    if type == 'number':
        for i in logs:
            dt = datetime.strptime(i['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime(r'%d/%m/%y')
            d[dt] = d.get(dt, 0) + float(i['value'])

    elif type == 'choice':
        for i in logs:
            d[i['value']] = d.get(i['value'],0) + 1
   
    elif type == 'text':
        for i in logs:
            d[i['value']] = d.get(i['value'],0) + 1
    
    elif type == 'bool':
        for i in logs:
            d[i['value']] = d.get(i['value'],0) + 1
    
    elif type == 'duration':
        for i in logs:
            x = list(map(float, i['value'].split(':')))
            secs = x[0] * 60 + x[1] * 60 + x[2]
            dt = datetime.strptime(i['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime(r'%d/%m/%y')
            d[dt] = d.get(dt, 0) + secs
    print(d)
    return d, title

def import_csv(tracker_id, f):
    print('thawing file')
    # print(DataSet(database)['Logs'].columns)
    print(DataSet(database).thaw('Logs',format='csv', file_obj=f, strict=True))
