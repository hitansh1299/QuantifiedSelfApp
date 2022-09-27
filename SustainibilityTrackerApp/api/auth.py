import bcrypt
import json
from flask import Blueprint, render_template, request, redirect, jsonify
from Database.models import User

auth = Blueprint(
    'auth_bp', 
    __name__
)

def identify(payload):
    print(payload)
    email = payload.get('identity', None) or payload.get()
    return User.get_by_id(email).id

def authenticate_user(email: str, password: str):
    user = User.get_or_none(User.id == email) 
    # print(user.email, user.password)
    # print(str(user.password))
    if bcrypt.checkpw(password.encode('utf-8'), str(user.password).encode('utf-8')):
        return user

'''
/login is handled by Flask JWT
'''
#TODO: Have to do shit here, validation and stuff,,, Lots to do to sanitize input
@auth.route('/register', methods=['POST'])
def register():
    user = request.get_json()['user']
    # print(user)
    # print(user['firstname'])
    try:
        User.create(
            name=user['firstname'],
            id=user['email'],
            phone="",
            password=bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        )
    except:
        pass
    return jsonify({"USER":"REGISTERED"})