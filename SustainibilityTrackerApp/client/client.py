from pydoc import cli
from flask import Blueprint, render_template
client = Blueprint(
    "client",
    __name__,
    static_folder="./static",
    static_url_path="/client/static",
    template_folder=r"templates"
)

@client.route('/')
def index():
    return render_template('login.html')