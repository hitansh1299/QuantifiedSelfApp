from flask_jwt import jwt_required, current_identity
import json
from flask import Blueprint, render_template, jsonify, request, Response
from Database.db import _createNewTracker, _getTrackers
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

@client.route('/tracker/add',methods=['POST'])
@jwt_required()
def addTracker():
    data = request.get_json(force=True)['data']
    print('Identity',current_identity)
    _createNewTracker(str(current_identity), str(json.dumps(data)))
    return jsonify({'status':200})

@client.route('/tracker/get',methods=['GET'])
@jwt_required()
def getTrackers():
    identity = str(current_identity)
    trackers = _getTrackers(identity)
    print(trackers)
    return jsonify(trackers)