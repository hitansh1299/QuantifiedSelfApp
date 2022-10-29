import os
import sys
from unittest import TextTestRunner
from celery import Celery
from flask import Blueprint
from flask_caching import Cache
from celery import current_app
from Database.db import getCSV
from client.scheduling import send_csv

cache = Cache(config={
    'CACHE_TYPE':'RedisCache',
    'CACHE_REDIS_HOST':'localhost',
    'CACHE_REDIS_PORT':6379,
    'CACHE_REDIS_URL':'redis://localhost:6379'
})

client = Blueprint(
    "client",
    __name__,
    static_folder="./static",
    static_url_path="/client/static",
    template_folder="templates"
)

sys.path.append("SustainibilityTrackerApp\\")
sys.path.append("SustainibilityTrackerApp\\Database\\")

# def make_celery(app) -> Celery:
#     celery = Celery(app.import_name,broker='redis://localhost:6379/0',backend='redis://localhost:6379/0')
#     class ContextTask(celery.Task):
#         def __call__(self, *args, **kwargs):
#             return self.run(*args, **kwargs)

#     celery.Task = ContextTask
#     # cel = celery
#     return celery

# celery = Celery('client',broker='redis://localhost:6379/0',backend='redis://localhost:6379/0')

# celery = make_celery(client)
