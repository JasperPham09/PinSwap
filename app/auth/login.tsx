import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home"); // hoặc bất kỳ trang nào sau khi login
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Lỗi", "Email không tồn tại!");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Lỗi", "Sai mật khẩu!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Lỗi", "Email không hợp lệ!");
      } else {
        Alert.alert("Lỗi", error.message || "Đăng nhập thất bại!");
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5E6", padding: 20 }}>
      {/* ... giữ nguyên phần UI ... */}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.trim().toLowerCase())}
        placeholder="Nhập email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
      />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Mật khẩu</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Nhập mật khẩu"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 30,
          backgroundColor: "#fff",
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4C7744",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Bạn chưa có tài khoản?{" "}
        <Text
          style={{
            fontWeight: "bold",
            color: "#3D6D4A",
            textDecorationLine: "underline",
          }}
          onPress={() => router.push("/auth/register")}
        >
          Vui lòng đăng ký
        </Text>
      </Text>
    </View>
  );
}
