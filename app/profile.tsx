import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Nếu bạn muốn dùng icon mắt

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Phần Header Logo - Tinh chỉnh logo và subtitle */}
        <View style={styles.headerContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoText}>PINSWAP</Text>
            <Text style={styles.subLogoText}>Vì Trái Đất xanh</Text>
          </View>
        </View>

        {/* Phần Button Đăng nhập - Đăng ký (tinh chỉnh button) */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.loginRegisterButton, styles.loginButtonActive]}> {/* Thêm style loginButtonActive cho nút Đăng nhập */}
            <Text style={[styles.loginRegisterButtonText, styles.loginButtonActiveText]}>ĐĂNG NHẬP</Text> {/* Thêm style loginButtonActiveText */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginRegisterButton}>
            <Text style={styles.loginRegisterButtonText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>

        {/* Phần Form Đăng nhập - Tinh chỉnh input và password container */}
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, styles.roundedInput]}
            placeholder="Email hoặc số điện thoại"
            placeholderTextColor="#999" // Màu placeholder nhạt hơn
          />
          <View style={[styles.passwordInputContainer, styles.roundedInput]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              placeholderTextColor="#999" // Màu placeholder nhạt hơn
              secureTextEntry={true}
            />
            {/* Icon mắt (tùy chọn) */}
            {/* <TouchableOpacity style={styles.eyeIcon}>
              <Ionicons name="eye-off-outline" size={24} color="gray" />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>

        {/* Phần Link Đăng ký nếu chưa có tài khoản (không đổi) */}
        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản? Vui lòng</Text>
          <TouchableOpacity>
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 25, // Padding ngang container, cân đối hơn
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
    backgroundColor: '#7CB342', // Màu xanh lá cây chuẩn theo ảnh
    paddingVertical: 35, // Tăng padding dọc logo background
    paddingHorizontal: 90, // Tăng padding ngang logo background
    borderTopLeftRadius: 60, // Bo tròn góc trên bên trái khác biệt
    borderTopRightRadius: 60, // Bo tròn góc trên bên phải khác biệt
    borderBottomLeftRadius: 30, // Bo tròn góc dưới bên trái
    borderBottomRightRadius: 30, // Bo tròn góc dưới bên phải
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 60, // Cỡ chữ PINSWAP lớn hơn chút
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Bóng đổ tinh tế hơn
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3, // Bán kính bóng đổ nhỏ hơn
  },
  subLogoText: {
    fontSize: 22, // Cỡ chữ subtitle lớn hơn chút
    color: '#fefefe', // Màu trắng ngà, gần giống ảnh
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 25, // Tăng khoảng cách button group xuống
  },
  loginRegisterButton: {
    backgroundColor: '#e0e0e0', // Màu xám nút Đăng ký/Đăng nhập chung
    paddingVertical: 14, // Padding dọc nút Đăng ký/Đăng nhập
    paddingHorizontal: 30, // Padding ngang nút Đăng ký/Đăng nhập
    borderRadius: 30, // Bo tròn nút Đăng ký/Đăng nhập
    marginHorizontal: 8, // Khoảng cách giữa 2 nút
  },
  loginRegisterButtonText: {
    color: '#333', // Màu chữ nút Đăng ký/Đăng nhập đậm hơn chút
    fontWeight: 'bold',
    fontSize: 17, // Cỡ chữ nút Đăng ký/Đăng nhập lớn hơn chút
  },
  loginButtonActive: { // Style riêng cho nút "ĐĂNG NHẬP" active
    backgroundColor: '#7CB342', // Màu xanh lá cây nút "ĐĂNG NHẬP" active
  },
  loginButtonActiveText: { // Style riêng cho text nút "ĐĂNG NHẬP" active
    color: '#fefefe', // Màu chữ trắng ngà nút "ĐĂNG NHẬP" active
  },
  formContainer: {
    width: '100%',
    marginBottom: 25, // Tăng khoảng cách form xuống
  },
  input: {
    height: 55, // Chiều cao input lớn hơn
    borderColor: '#ddd', // Viền input nhạt hơn
    borderWidth: 1,
    marginBottom: 15, // Khoảng cách input xuống
    paddingHorizontal: 20, // Padding ngang input
    backgroundColor: '#fefefe', // Nền input trắng ngà
    color: '#333', // Màu chữ input đậm hơn chút
    fontSize: 18, // Cỡ chữ input lớn hơn chút
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd', // Viền password container nhạt hơn
    borderWidth: 1,
    backgroundColor: '#fefefe', // Nền password container trắng ngà
  },
  passwordInput: {
    flex: 1,
    height: 55, // Chiều cao password input lớn hơn
    paddingHorizontal: 20, // Padding ngang password input
    color: '#333', // Màu chữ password input đậm hơn chút
    fontSize: 18, // Cỡ chữ password input lớn hơn chút
  },
  eyeIcon: {
    padding: 15, // Padding icon mắt lớn hơn
  },
  loginButton: {
    backgroundColor: '#7CB342', // Màu xanh lá cây nút ĐĂNG NHẬP chính
    paddingVertical: 16, // Padding dọc nút ĐĂNG NHẬP chính
    borderRadius: 30, // Bo tròn nút ĐĂNG NHẬP chính
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fefefe', // Màu chữ trắng ngà nút ĐĂNG NHẬP chính
    fontWeight: 'bold',
    fontSize: 20, // Cỡ chữ nút ĐĂNG NHẬP chính lớn hơn
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    marginRight: 8, // Khoảng cách chữ "Vui lòng"
    color: '#666', // Màu chữ "Vui lòng" xám hơn chút
    fontSize: 16, // Cỡ chữ "Vui lòng" lớn hơn chút
  },
  registerButtonText: {
    color: '#007BFF', // Màu xanh link Đăng ký (giữ nguyên)
    fontWeight: 'bold',
    fontSize: 16, // Cỡ chữ link Đăng ký lớn hơn chút
  },
  roundedInput: {
    borderRadius: 30, // Bo tròn input và password container
  },
});