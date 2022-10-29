from email import encoders
from email.mime.base import MIMEBase
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from apscheduler.schedulers.background import BackgroundScheduler
from Database.db import __get_unupdated_trackers__, get_reportable_trackers, getData
from datetime import datetime
from celery import Celery

celery = Celery('client',broker='redis://localhost:6379/0',backend='redis://localhost:6379/0')


@celery.task()
def send_mail(to, message):
    port = 465 # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "qsapp2022@gmail.com" # Enter your address
    receiver_email = to  # Enter receiver address
    password = "wivyhljpljshrous"
    # message['Subject'] = subject
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        # server.starttls(context=context)
        print('sending mail')
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
        print('mail sent')


def send_report(email, data= "", labels="", title="Tracker"):

    body="Here is your monthly report!"

    html = '''
    <html><head><link rel="stylesheet" href="client/static/components/form/common.css">
        <!-- Optional theme.css -->
        <link rel="stylesheet" type="text/css" href="client/static/components/form/green_theme.css">
        <!-- Optional font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;900&amp;display=swap">
        <script src="https://kit.fontawesome.com/0eab3f28b6.js" crossorigin="anonymous"></script><style media="all" id="fa-v4-font-face"></style>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        
        </head><body><main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-600">
            <div class="container mx-auto px-6 py-8">
                <div>
                    <h3 class="text-3xl font-medium text-white">##title##</h3>
                    <div class="mt-4 text-white">
                        <div class="flex flex-wrap">
                            <div class="w-full px-6">
                                <div class="flex px-5 py-6 rounded-md shadow-sm">
                                    <div class="w-full">
                                        <div class="relative shadow-lg rounded-lg overflow-hidden w-auto">
                                            <div class="py-3 px-5 bg-gray-50 w-full text-emerald-600">Line chart</div><canvas class="p-10 bg-white" id="linechart" width="1144" height="571" style="display: block; box-sizing: border-box; height: 571px; width: 1144px;"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8"></div>
                    <div class="flex flex-col mt-8">
                        
                    </div>
                </div>
            </div>
        </main>
        <script>
        const labels = ##labels##;
        
        const data = {
            labels: labels,
            datasets: [
            {
                label: "value",
                maxBarThickness: 40,
                backgroundColor: "hsl(252, 82.9%, 67.8%)",
                borderColor: "hsl(252, 82.9%, 67.8%)",
                data: ##data## ,
            },
            ],
        };
        
        const configLineChart = {
            type: "bar",
            data,
            options: {
                responsive: true
            },
        };
        
        var chartLine = new Chart(
            "linechart",
            configLineChart
        );
        </script>
        </body>
        
        </html>
    '''.replace('##labels##',labels)\
    .replace('##data##',data)\
    .replace('##title##',title)

    message = MIMEMultipart("alternative")
    message["Subject"] = "Monthly Report"
    b = MIMEText(body, "plain")
    
    with open('report.html', 'wb') as report:
        report.write(bytes(html, 'utf-8'))
        part = MIMEBase('a','octet-stream')
    with open('report.html','rb') as report:
        part.set_payload(report.read())
    encoders.encode_base64(part)
    part.add_header(
    "Content-Disposition",
    "attachment; filename= report.html",
    )

    message.attach(b)
    message.attach(part)
    
    print('sending mail to:', email)
    message['Subject'] = "Here's your monthly report!"
    send_mail.delay(email, message.as_string())
    # send_mail(email, message=message.as_string())

def send_alert(email):
    try:
        message = MIMEText('Hi, This is a reminder to update your trackers for today!')
        message['Subject'] = 'DAILY REMINDER!'
        send_mail.delay(to=email, message=message.as_string())
    except smtplib.SMTPAuthenticationError:
        print('AUTH ERROR')

def send_alerts():
    print('sending alert @',datetime.now())
    trackers = __get_unupdated_trackers__()
    users = set([t.user for t in trackers])
    print(users)
    for u in users:
        send_alert(u)

def send_reports():
    print('sending reports @',datetime.now())
    users = [(t.id, t.user) for t in get_reportable_trackers()]
    for id, u in users:
        d, title = getData(id)
        send_report(u, data=str(list(d.values())), labels=str(list(d.keys())), title=title)

def send_csv(email, file):
    message = MIMEMultipart("alternative")
    message["Subject"] = "Monthly Report"
    b = MIMEText("Here is your tracker exported. Please find the same attached as a CSV", "plain")
    part = MIMEBase('a','octet-stream')
    part.set_payload(file.read())
    encoders.encode_base64(part)
    part.add_header(
    "Content-Disposition",
    "attachment; filename=tracker.csv",
    )
 
    message.attach(b)
    message.attach(part)
    
    send_mail(to=email, message=message, subject="Your exported tracker!")

def schedule_jobs():
    print('scheduling job @',datetime.now())
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(send_alerts,'cron',hour=12,minute=52)
    sched.add_job(send_reports,'cron',day=1)
    sched.start()