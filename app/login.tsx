import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5E6', padding: 20 }}>
            {/* Header */}
            <View style={{ backgroundColor: '#4C7744', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFD700' }}>PIN</Text>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000' }}>SWAP</Text>
                <Text style={{ color: '#FFD700', marginTop: 5 }}>Vì Trái Đất xanh</Text>
            </View>

            {/* Tabs */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                <TouchableOpacity style={{ backgroundColor: '#4C7744', padding: 10, borderRadius: 20, marginRight: 10 }}>
                    <Text style={{ color: 'white' }}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#4C7744', padding: 10, borderRadius: 20 }}>
                    <Text style={{ color: '#4C7744' }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <TextInput 
                style={{ borderWidth: 1, borderColor: '#4C7744', borderRadius: 10, padding: 10, marginBottom: 15 }}
                placeholder='Email hoặc số điện thoại'
                placeholderTextColor='#888'
                value={email}
                onChangeText={setEmail}
            />
            
            <TextInput 
                style={{ borderWidth: 1, borderColor: '#4C7744', borderRadius: 10, padding: 10, marginBottom: 15 }}
                placeholder='Mật khẩu'
                placeholderTextColor='#888'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            
            {/* Login Button */}
            <TouchableOpacity style={{ backgroundColor: '#4C7744', padding: 15, borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16 }}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            {/* Sign up link */}
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Bạn chưa có tài khoản? Vui lòng
                <Text style={{ fontWeight: 'bold', color: '#000' }}> Đăng ký</Text>
            </Text>
        </View>
    );
};

export default LoginScreen;
