// app/auth/register.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
  
      // ⬇️ Ghi thêm vào Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        title: "Người dùng mới",
        points: 0,
        maxPoints: 0,
        followers: [],
        following: [],
        rank: 0,
        createdAt: new Date(),
      });
  
      Alert.alert("Thành công", "Đăng ký thành công!");
      setName("");
      setEmail("");
      setPassword("");
      router.replace("/(tabs)/home");
    } catch (error: any) {
      const code = error.code;
      if (code === "auth/email-already-in-use") {
        Alert.alert("Lỗi", "Email đã được sử dụng!");
      } else if (code === "auth/invalid-email") {
        Alert.alert("Lỗi", "Email không hợp lệ!");
      } else if (code === "auth/weak-password") {
        Alert.alert("Lỗi", "Mật khẩu phải từ 6 ký tự trở lên!");
      } else {
        Alert.alert("Lỗi", error.message || "Đăng ký thất bại!");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        PIN<Text style={styles.highlight}>SWAP</Text>
      </Text>
      <Text style={styles.subtitle}>Vì Trái Đất Xanh</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Đã có tài khoản?{" "}
        <Text
          style={styles.linkText}
          onPress={() => router.push("/(auth)/login")}
        >
          Đăng nhập
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5DC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D6D4A",
  },
  highlight: {
    color: "#FFD700",
  },
  subtitle: {
    textAlign: "center",
    color: "#3D6D4A",
    marginBottom: 30,
  },
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
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
  },
  linkText: {
    fontWeight: "bold",
    color: "#3D6D4A",
    textDecorationLine: "underline",
  },
});
