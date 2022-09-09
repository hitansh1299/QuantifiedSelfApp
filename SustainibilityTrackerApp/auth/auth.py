import bcrypt
import json
from flask import Blueprint, render_template, request, redirect
from Database.models import User

auth = Blueprint(
    'auth_bp', 
    __name__,
    template_folder='templates',    
    static_folder='static',
    static_url_path='/auth/static'
)

@auth.route('/')
def land():
    return render_template('login.html')

def identify(email):
    return User.get_by_id(email).name

def authenticate_user(email: str, password: str):
    
    user = User.get_or_none(User.email == email) 
    print(user.email, user.password)
    if bcrypt.checkpw(user.password, password):
        return user