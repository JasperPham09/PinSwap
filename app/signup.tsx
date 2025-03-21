import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
    // Add other routes here if needed
  };

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    axios
      .post("http://192.168.1.12:5000/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        Alert.alert("Thành công", "Đăng ký thành công!");
        navigation.navigate("Login"); // Chuyển sang màn hình đăng nhập
      })
      .catch((error) => {
        Alert.alert("Lỗi", error.response?.data?.message || "Có lỗi xảy ra!");
      });
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#F5F5DC" }}>
      {/* Logo */}
      <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#3D6D4A" }}>
        PIN<Text style={{ color: "#FFD700" }}>SWAP</Text>
      </Text>
      <Text style={{ textAlign: "center", color: "#3D6D4A", marginBottom: 30 }}>Vì Trái Đất xanh</Text>

      {/* Form đăng ký */}
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email hoặc số điện thoại"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Nút đăng ký */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      {/* Chuyển sang màn hình đăng nhập */}
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Bạn đã có tài khoản?{" "}
        <Text
          style={{ fontWeight: "bold", color: "#3D6D4A" }}
          onPress={() => navigation.navigate("Login")}
        >
          Đăng nhập
        </Text>
      </Text>
    </View>
  );
};

// Style
const styles = {
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#3D6D4A",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#3D6D4A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center" as "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold" as "bold",
  },
};

export default RegisterScreen;
