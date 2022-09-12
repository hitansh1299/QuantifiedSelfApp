import bcrypt
import json
from flask import Blueprint, render_template, request, redirect
from Database.models import User
from flask_jwt import jwt_required

dash = Blueprint(
    'dasboard', 
    __name__,
    template_folder='templates',    
    static_folder='static',
    static_url_path='/dashboard/static'
)

@jwt_required
@dash.route('/')
def land():
    return render_template('dashboard.html')


