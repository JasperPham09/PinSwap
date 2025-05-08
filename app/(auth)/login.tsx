import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
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
      Alert.alert("Đăng nhập thành công!", "Bạn đã đăng nhập thành công.");
      router.replace("/(tabs)/home");
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>
          <Text style={{ color: "#F6E952" }}>PIN</Text>
          <Text style={{ color: "black" }}>SWAP</Text>
        </Text>
        <Text style={styles.subtitle}>Vì Trái Đất xanh</Text>
      </View>

      {/* Switch Buttons
      <View style={styles.switchButtons}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inactiveTab}
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.inactiveTabText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View> */}

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Đăng nhập */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      {/* Đăng ký link */}
      <Text style={styles.bottomText}>
        Bạn chưa có tài khoản?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => router.push("/(auth)/register")}
        >
          Vui Lòng Đăng ký
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5E6",
    padding: 24,
  },
  header: {
    backgroundColor: "#4C7744",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    padding: 40,
    paddingBottom: 50,
    alignItems: "center",
    marginBottom: 50,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    color: "#F6E952",
    fontSize: 14,
    fontWeight: "500",
  },
  switchButtons: {
    flexDirection: "row",
    marginTop: -30,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    overflow: "hidden",
    elevation: 4,
  },
  activeTab: {
    backgroundColor: "#4C7744",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  inactiveTab: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: "#4C7744",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: "#4C7744",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4C7744",
    borderRadius: 10,
    padding: 14,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#4C7744",
    padding: 15,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 14,
  },
  registerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#3D6D4A",
  },
});
