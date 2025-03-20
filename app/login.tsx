import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const [emailsdt, setEmailSDT] = useState("");
const [pass, setPass] = useState("");

if (typeof global.myVariable !== "undefined") {
  console.log("Biến toàn cục:", global.myVariable);
} else {
  console.log("Biến chưa được khởi tạo!");
}

console.log(global.myVariable);  // Kết quả: "Xin chào từ biến toàn cục!"


export default function App() {
  function setEmailSDT(emailsdt: string): void {
    throw new Error('Function not implemented.');
  }
  function setPass(pass: string): void {
    throw new Error('Function not implemented.');
  }


  return (
    <ScrollView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.headerContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoText}>PINSWAP</Text>
            <Text style={styles.subLogoText}>Vì Trái Đất xanh</Text>
          </View>
        </View>

        
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.loginRegisterButton, styles.loginButtonActive]}> {/* Thêm style loginButtonActive cho nút Đăng nhập */}
            <Text style={[styles.loginRegisterButtonText, styles.loginButtonActiveText]}>ĐĂNG NHẬP</Text> {/* Thêm style loginButtonActiveText */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginRegisterButton}>
            <Text style={styles.loginRegisterButtonText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, styles.roundedInput]}
            placeholder="Email hoặc số điện thoại"
            placeholderTextColor="#999" 
            onChangeText={(emailsdt) => setEmailSDT(emailsdt)}
          />
          <View style={[styles.passwordInputContainer, styles.roundedInput]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              placeholderTextColor="#999" 
              secureTextEntry={true}
              onChangeText={(password) => setPass(password)}
            />
           
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>

      
        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản? Vui lòng</Text>
          <TouchableOpacity>
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 25, 
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoBackground: {
    backgroundColor: '#7CB342', 
    paddingVertical: 35, 
    paddingHorizontal: 90, 
    borderTopLeftRadius: 60, 
    borderTopRightRadius: 60, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3, 
    paddingLeft: 5,
  },
  subLogoText: {
    fontSize: 22, 
    color: '#fefefe', 
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 25, 
  },
  loginRegisterButton: {
    backgroundColor: '#e0e0e0', 
    paddingVertical: 14, 
    paddingHorizontal: 30, 
    borderRadius: 30, 
    marginHorizontal: 8, 
  },
  loginRegisterButtonText: {
    color: '#333', 
    fontWeight: 'bold',
    fontSize: 17,
  },
  loginButtonActive: { 
    backgroundColor: '#7CB342', 
  },
  loginButtonActiveText: { 
    color: '#fefefe', 
  },
  formContainer: {
    width: '100%',
    marginBottom: 25, 
  },
  input: {
    height: 55, 
    borderColor: '#ddd', 
    borderWidth: 1,
    marginBottom: 15, 
    paddingHorizontal: 20, 
    backgroundColor: '#fefefe',
    color: '#333', 
    fontSize: 18, 
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd', 
    borderWidth: 1,
    backgroundColor: '#fefefe', 
  },
  passwordInput: {
    flex: 1,
    height: 55, 
    paddingHorizontal: 20, 
    color: '#333', 
    fontSize: 18, 
  },
  eyeIcon: {
    padding: 15, 
  },
  loginButton: {
    backgroundColor: '#7CB342', 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fefefe', 
    fontWeight: 'bold',
    fontSize: 20, 
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    marginRight: 8, 
    color: '#666', 
    fontSize: 16, 
  },
  registerButtonText: {
    color: '#007BFF', 
    fontWeight: 'bold',
    fontSize: 16, 
  },
  roundedInput: {
    borderRadius: 30, 
  },
});