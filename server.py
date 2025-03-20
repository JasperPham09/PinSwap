from flask import Flask, request, jsonify

app = Flask(__name__)

# Biến toàn cục trong Python
global_variable = "Xin chào từ Python!"

# API gửi biến Python về React Native
@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify({"message": global_variable})

# API nhận dữ liệu từ React Native
@app.route('/send-data', methods=['POST'])
def send_data():
    global global_variable
    data = request.json  # Nhận JSON từ React Native
    global_variable = data.get("newMessage", global_variable)
    return jsonify({"status": "success", "updated_message": global_variable})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
