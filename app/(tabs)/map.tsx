// /app/tabs/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


export default function MapScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !phone || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
  
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        phone,
        address,
        createdAt: new Date(),
      });
  
      Alert.alert('Đã gửi', `Cảm ơn bạn, ${name}! Chúng tôi sẽ liên hệ qua ${email}.`);
  
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch (error) {
      console.error("Lỗi gửi thông tin: ", error);
      Alert.alert('Lỗi', 'Không thể gửi thông tin. Vui lòng thử lại.');
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📍 Bản đồ thu gom pin</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 21.0278,
            longitude: 105.8342,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Ví dụ 1 điểm thu gom pin */}
          <Marker
            coordinate={{ latitude: 21.0285, longitude: 105.8542 }}
            title="Điểm thu gom pin"
            description="123 Đường Giả Định, Hà Nội"
          />
        </MapView>

        <Text style={styles.formTitle}>📬 Gửi thông tin liên hệ</Text>

        <TextInput
          placeholder="Họ tên"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        <Button title="Gửi thông tin" onPress={handleSubmit} color="#007AFF" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});
