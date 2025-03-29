# import email
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_bcrypt import Bcrypt
# from pymongo import MongoClient
# from flask import session

# app = Flask(__name__)
# CORS(app)  # Cho phép React Native gọi API từ server Flask
# bcrypt = Bcrypt(app)  # Mã hóa mật khẩu
# app.secret_key = "your_secret_key"

# # Kết nối MongoDB (thay URI nếu cần)
# client = MongoClient("mongodb://localhost:27017/")
# db = client["pinswap_db"]
# users_collection = db["users"]

# # API Đăng ký
# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     name = data.get("name")
#     email = data.get("email")
#     password = data.get("password")

#     if not name or not email or not password:  # Kiểm tra nếu thiếu dữ liệu
#         return jsonify({"error": "Thiếu thông tin đăng ký"}), 400

#     # Kiểm tra xem email đã tồn tại chưa
#     if users_collection.find_one({"email": email}):
#         return jsonify({"message": "Email đã tồn tại!"}), 400

#     # Mã hóa mật khẩu và lưu vào DB
#     hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
#     users_collection.insert_one({"name": name, "email": email, "password": hashed_password})

#     return jsonify({"message": "Đăng ký thành công!"}), 201

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)
