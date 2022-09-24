from flask_jwt import jwt_required
from flask import Blueprint, render_template, jsonify
client = Blueprint(
    "client",
    __name__,
    static_folder="./static",
    static_url_path="/client/static",
    template_folder="templates"
)

@client.route('/')
def index():
    return render_template('login.html')

@jwt_required
@client.route('/protectedEndpoint')
def dummy():
    return jsonify({"HELLO":"WORLD!"})