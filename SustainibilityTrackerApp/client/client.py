from datetime import date, datetime
from flask_jwt import jwt_required, current_identity
import json
from flask import Blueprint, render_template, jsonify, request, Response
from flask_caching import Cache
# from tasks import get_csv
from Database.db import _createNewTracker, _getTrackers, createLog, _getLogs, _editDate, _editNote, _deleteLog, _deleteTracker, getCSV, import_csv
from client import client, cache
# from client import get_csv
from client.scheduling import send_reports, send_alerts

@client.route('/')
def index():
    return render_template('index.html')

@client.route('/tracker/',methods=['POST'])
@jwt_required()
def addTracker():
    cache.delete(current_identity)
    data = request.get_json(force=True)['data']
    # print('Identity',current_identity)
    _createNewTracker(str(current_identity), str(json.dumps(data)))
    return jsonify({'status':200})

@client.route('/tracker/',methods=['GET'])
@jwt_required()
@cache.cached(make_cache_key=lambda: current_identity,key_prefix='')
def getTrackers():
    identity = str(current_identity)
    trackers = _getTrackers(identity)
    # print(trackers)
    return jsonify(trackers)

@client.route('/tracker/log',methods=['POST'])
@jwt_required()
def log():
    identity = str(current_identity)
    data = request.get_json(force=True)['data']
    # print(data)
    createLog(
        tracker_id=data['id'],
        note=data['notes'],
        value=data['value'],
        datetime=data['datetime']
    )
    cache.delete(current_identity)
    return jsonify({"Log":"Created"})


@client.route('/tracker/<tracker_id>/logs',methods=['GET'])
@jwt_required()
def getLogs(tracker_id):
    # data = request.get_json(force=True)['data']
    # print(data, tracker_id)
    logs = _getLogs(tracker_id=tracker_id)
    return jsonify({'logs': logs})

@client.route('/tracker/date',methods=['POST', 'PUT'])
@jwt_required()
def editDate():
    data = request.get_json(force=True)['data']
    # print(data)
    _editDate(data['id'], data['date'])
    cache.delete(current_identity)
    return jsonify({'date': 'edited'})

@client.route('/tracker/note',methods=['POST', 'PUT'])
@jwt_required()
def editNote():
    data = request.get_json(force=True)['data']
    # print(data)
    _editNote(data['id'], data['note'])

@client.route("/tracker/<tracker_id>", methods=['DELETE'])
@jwt_required()
def deleteTracker(tracker_id):
    cache.delete(current_identity)
    _deleteTracker(tracker_id)
    return jsonify({'TRACKER':'DELETED'})

@client.route('/tracker/log/<id>',methods=['DELETE'])
@jwt_required()
def deleteLog(id):
    _deleteLog(id)
    return jsonify({'note': 'DELETED'})

@client.route('/tracker/import/logs/<id>',methods=['POST'])
@jwt_required()
def importLogs(id):
    # print(request.form)
    # print(request.get_json(force=True)) 
    request.files.get('logs').save('logs.csv')
    with open('logs.csv') as logs:
        # for i in logs.readlines():
        #     print(str(i))
        import_csv(1, logs)
    return jsonify({'LOGS': 'IMPORTED'})

@client.route('/tracker/chart/<log_id>/<type>',methods=['GET'])
@jwt_required()
def getChart(log_id, type):
    logs = _getLogs(log_id)
    d = {}
    if type == 'number':
        logs.sort(key=lambda x: x['datetime'])
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
        logs.sort(key=lambda x: x['datetime'])
        for i in logs:
            x = list(map(float, i['value'].split(':')))
            secs = x[0] * 60 + x[1] * 60 + x[2]
            dt = datetime.strptime(i['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime(r'%d/%m/%y')
            d[dt] = d.get(dt, 0) + secs
    # print(d)
    return jsonify({'x': list(d.keys()), 'y': list(d.values())})

@client.route("/tracker/getCSV/<tracker_id>", methods=['GET'])
@jwt_required()
def getPlotCSV(tracker_id):
    csv = getCSV(tracker_id=tracker_id)
    # get_csv.delay(tracker_id, str(current_identity))
    # csv.wait()
    return Response(
    csv,
    mimetype="text/csv",
    headers={"Content-disposition":
                "attachment; filename=myplot.csv"})


@client.route('/test_report')
def mail():
    send_reports()
    return jsonify({'STATUS':'OK'})

@client.route('/test_alert')
def test():
    send_alerts()
    return jsonify({'STATUS':'OK'})



