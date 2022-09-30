from cProfile import label
from datetime import date, datetime
from flask_jwt import jwt_required, current_identity
import json
from flask import Blueprint, render_template, jsonify, request, Response
from Database.db import _createNewTracker, _getTrackers, createLog, _getLogs, _editDate, _editNote, _deleteLog, getCSV, _deleteTracker
from Database.models import User, Logs
client = Blueprint(
    "client",
    __name__,
    static_folder="./static",
    static_url_path="/client/static",
    template_folder="templates"
)

@client.route('/')
def index():
    return render_template('index.html')

@client.route('/tracker/',methods=['POST'])
@jwt_required()
def addTracker():
    data = request.get_json(force=True)['data']
    # print('Identity',current_identity)
    _createNewTracker(str(current_identity), str(json.dumps(data)))
    return jsonify({'status':200})

@client.route('/tracker/',methods=['GET'])
@jwt_required()
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
    return jsonify({'date': 'edited'})

@client.route('/tracker/note',methods=['POST', 'PUT'])
@jwt_required()
def editNote():
    data = request.get_json(force=True)['data']
    # print(data)
    _editNote(data['id'], data['note'])
    return jsonify({'note': 'edited'})

@client.route('/tracker/log/<id>',methods=['DELETE'])
@jwt_required()
def deleteLog(id):
    _deleteLog(id)
    return jsonify({'note': 'DELETED'})

@client.route('/tracker/chart/<log_id>/<type>',methods=['GET'])
@jwt_required()
def getChart(log_id, type):
    logs = _getLogs(log_id)
    print(logs)
    d = {}
    if type == 'number':
        # [datetime.strptime(i['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime(r'%d/%m/%y') for i in logs]
        # data = [float(i['value']) for i in logs]
        # print(labels)
        
        for i in logs:
            dt = datetime.strptime(i['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime(r'%d/%m/%y')
            d[dt] = d.get(dt, 0) + float(i['value'])
    if type == 'choice':
        for i in logs:
            d[i['value']] = d.get(i['value'],0) + 1

    # print(d)
    return jsonify({'x': list(d.keys()), 'y': list(d.values())})

@client.route("/tracker/getCSV/<tracker_id>", methods=['GET'])
@jwt_required()
def getPlotCSV(tracker_id):
    csv = getCSV(tracker_id)
    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=myplot.csv"})


@client.route("/tracker/<tracker_id>", methods=['DELETE'])
@jwt_required()
def deleteTracker(tracker_id):
    _deleteTracker(tracker_id)
    return jsonify({'TRACKER':'DELETED'})