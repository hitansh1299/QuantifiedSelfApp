from celery import Celery
# from Database.db import getCSV
# from flask import current_app
cel = Celery()
def make_celery(app):
    global cel
    celery = Celery(app.import_name,broker='redis://localhost:6379/0',backend='redis://localhost:6379/0')
    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    cel = celery
    return celery

@cel.task
def get_csv(tracker_id):
    csv = getCSV(tracker_id)
    return csv
