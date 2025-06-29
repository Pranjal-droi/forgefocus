from flask import Flask, render_template, request, redirect, url_for, session, flash
import json
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv()
app = Flask(__name__)  # Moved up

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

app.secret_key = os.getenv("SECRET_KEY") or "your_default_secret_key"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)




# Load users
def load_users():
    if not os.path.exists("users.json"):
        return {}
    with open("users.json", "r") as f:
        return json.load(f)

# Save users
def save_users(users):
    with open("users.json", "w") as f:
        json.dump(users, f)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/features")
def features():
    return render_template("features.html")
@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]
        # You could log or email this
        flash("Thanks for reaching out!", "success")
        return redirect(url_for("contact"))
    return render_template("contact.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        name = request.form["name"]

        users = load_users()
        if email in users:
            flash("Email already registered!", "error")
            return redirect(url_for("signup"))

        users[email] = {"name": name, "password": password}
        save_users(users)
        flash("Signup successful! Please log in.", "success")
        return redirect(url_for("login"))

    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        users = load_users()
        if email in users and users[email]["password"] == password:
            session["user"] = users[email]["name"]
            flash("Login successful!", "success")
            return redirect(url_for("dashboard"))
        else:
            flash("Invalid credentials!", "error")
            return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        flash("Please login to access dashboard", "error")
        return redirect(url_for("login"))
    return render_template("dashboard.html", user=session["user"])



@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("Logged out successfully!", "success")
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
# Ensure the users.json file exists
if not os.path.exists("users.json"):
    with open("users.json", "w") as f:
        json.dump({}, f)    