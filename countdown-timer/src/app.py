from datetime import datetime
import json
from flask import Flask
from flask import request
import logging



# TODO add force updating from reset


def get_home_content(time_remaining):
    home_content = f"""<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Days to</title>
        <link rel="stylesheet" href="/static/main.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        
    </head>
    <body>
        <div class="container">
        <div class="content">
           <p id="raw-time">{time_remaining}</p>
           <p id="timer"></p>
        </div>
        </div>

        <div class="current-time"></div>

        <script src="/static/data.js"></script>
        <script src="/static/main.js"></script>
    </body>
    </html>
    """
    return home_content


app = Flask(__name__)

STARTING_TIME = 120

class TimerInfo:
    def __init__(self):
        self.remaining_time = STARTING_TIME
        try:
            self._read_time()
        except FileNotFoundError:
            self._store_time()

    def _store_time(self, remaining_time):
        self.remaining_time = remaining_time
        data = {
            'remaining_time': remaining_time,
            'last_updated': str(datetime.now().isoformat())
        }
        with open('time.json', 'w') as file:
            json.dump(data, file)

    def _read_time(self):
        with open('time.json', 'r') as file:
            data = json.load(file)
            self.remaining_time = data['remaining_time']
            self.last_updated = datetime.fromisoformat(data['last_updated'])

    def reset_time(self):
        self._store_time(STARTING_TIME)

    def get_remaining_time(self):
        self._read_time()
        return self.remaining_time
    
    def set_remaining_time(self, set_time):
        self._store_time(set_time)

timer = TimerInfo()

@app.route("/")
def hello_world():
    time_remaining = timer.get_remaining_time()
    return get_home_content(time_remaining)


@app.route("/reset-timer")
def reset_timer():
    timer = TimerInfo()
    timer.reset_time()
    return "Timer has been reset"


@app.route("/update", methods=['POST'])
def update_time():
    data = request.form
    timer.set_remaining_time(int(data['time']))
    return "Time has been updated"
