from datetime import date
from flask_jwt import jwt_required, current_identity
import json
from flask import Blueprint, render_template, jsonify, request, Response
from Database.db import _createNewTracker, _getTrackers, createLog, _getLogs, _editDate, _editNote, _deleteLog
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
    print('Identity',current_identity)
    _createNewTracker(str(current_identity), str(json.dumps(data)))
    return jsonify({'status':200})

@client.route('/tracker/',methods=['GET'])
@jwt_required()
def getTrackers():
    identity = str(current_identity)
    trackers = _getTrackers(identity)
    print(trackers)
    return jsonify(trackers)

@client.route('/tracker/log',methods=['POST'])
@jwt_required()
def log():
    identity = str(current_identity)
    data = request.get_json(force=True)['data']
    print(data)
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
    print(data)
    _editDate(data['id'], data['date'])
    return jsonify({'date': 'edited'})

@client.route('/tracker/note',methods=['POST', 'PUT'])
@jwt_required()
def editNote():
    data = request.get_json(force=True)['data']
    print(data)
    _editNote(data['id'], data['note'])
    return jsonify({'note': 'edited'})

@client.route('/tracker/log/<id>',methods=['DELETE'])
@jwt_required()
def deleteLog(id):
    _deleteLog(id)
    return jsonify({'note': 'DELETED'})
