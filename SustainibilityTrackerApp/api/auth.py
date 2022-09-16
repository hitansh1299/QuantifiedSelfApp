import bcrypt
import json
from flask import Blueprint, render_template, request, redirect, jsonify
from Database.models import User

auth = Blueprint(
    'auth_bp', 
    __name__
)

def identify(email):
    return User.get_by_id(email).name

def authenticate_user(email: str, password: str):
    user = User.get_or_none(User.email == email) 
    # print(user.email, user.password)
    # print(str(user.password))
    if bcrypt.checkpw(password.encode('utf-8'), str(user.password).encode('utf-8')):
        user.__setattr__('id',user.email)
        return user

'''
/login is handled by Flask JWT
'''

@auth.route('/register', methods=['POST'])
def register():
    user = request.get_json()['user']
    print(user)
    print(user['firstname'])
    try:
        User.create(
            name=user['firstname'],
            email=user['email'],
            phone="",
            password=bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        )
    except:
        pass
    return jsonify({"USER":"REGISTERED"})