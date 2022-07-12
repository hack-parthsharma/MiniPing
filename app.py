from flask import Flask, render_template, request
import requests
import random
import time

app = Flask(__name__)


@app.route("/")
def home():
    panels = [
        {"title": "tais.dev", "url": "https://www.tais.dev"},
    ]
    return render_template("home.html", panels=panels)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/ping")
def ping():
    url = request.args.get("url")
    start_time = time.time()
    response = requests.get(url)
    end_time = time.time()
    diff_time = int((end_time - start_time) * 1000)

    return {"url": url, "code": response.status_code, "speed": diff_time}
