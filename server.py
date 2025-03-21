from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
import requests

app = Flask(__name__)
CORS(app)

# Cấu hình database (SQLite cho đơn giản)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["JWT_SECRET_KEY"] = "super-secret-key"

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Mô hình User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=True)  # Có thể NULL nếu dùng OAuth
    provider = db.Column(db.String(20), nullable=False, default="local")  # local, google, facebook

# Tạo database
with app.app_context():
    db.create_all()

# API Đăng ký
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data["email"]
    password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    name = data["name"]

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email đã tồn tại!"}), 400

    new_user = User(name=name, email=email, password=password, provider="local")
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Đăng ký thành công!"})

# API Đăng nhập
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user": {"name": user.name, "email": user.email}})
    return jsonify({"message": "Email hoặc mật khẩu không đúng!"}), 401

# API Đăng nhập với Google
@app.route("/oauth/google", methods=["POST"])
def google_login():
    token = request.json.get("token")

    google_info = requests.get(f"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}").json()
    email = google_info.get("email")
    name = google_info.get("name")

    if not email:
        return jsonify({"message": "Xác thực Google thất bại!"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(name=name, email=email, provider="google")
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": {"name": user.name, "email": user.email}})

# API Đăng nhập với Facebook
@app.route("/oauth/facebook", methods=["POST"])
def facebook_login():
    access_token = request.json.get("token")

    fb_info = requests.get(f"https://graph.facebook.com/me?fields=id,name,email&access_token={access_token}").json()
    email = fb_info.get("email")
    name = fb_info.get("name")

    if not email:
        return jsonify({"message": "Xác thực Facebook thất bại!"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(name=name, email=email, provider="facebook")
        db.session.add(user)
        db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": {"name": user.name, "email": user.email}})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
