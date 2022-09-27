from flask import Flask, render_template
from flask_jwt import JWT
from api.auth import auth, identify, authenticate_user
from client.client import client
from datetime import timedelta
from flask_peewee.db import Database
from Database.db import print_users, get_user_by_email

app = Flask(__name__,
static_url_path='/client')
app.config['JWT_AUTH_URL_RULE'] = '/auth/login' #change the default JWT token giver to /auth/login
app.config['JWT_AUTH_USERNAME_KEY'] = 'identity'
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=1)
app.register_blueprint(client)
app.register_blueprint(auth, url_prefix='/auth')

    
# app.config['EXPLAIN_TEMPLATE_LOADING'] = True


app.config['DATABASE'] = {
    'name': 'SustainibilityTrackerApp\Database\database.db',
    'engine': 'peewee.SqliteDatabase'
}
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'da421ee556a9de5ac52393a4db01a6acc4d5c969005b61f649a6bd70bd2283a9'

db = Database(app)

jwt = JWT(app, authenticate_user, identify)


if __name__ == '__main__':
    app.run(
        host='localhost',
        port='5000',
        debug=True
    )
    print_users()

    


