import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const YCTG = () => {
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [pinCount, setPinCount] = useState('');
  const [pinType, setPinType] = useState('');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const router = useRouter();
  const timeSlots = ['8:00-11:00', '14:00-17:00'];
  const { height } = Dimensions.get('window');

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Quyền bị từ chối', 'Vui lòng cho phép truy cập thư viện ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: (ImagePicker as any).MediaTypeOptions?.Images ?? 'Images',
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Quyền bị từ chối', 'Vui lòng cho phép truy cập camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!fullName || !contactInfo || !pinCount || !address || !timeSlot) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    router.push({
      pathname: '/(screen)/confirm',
      params: {
        fullName,
        contactInfo,
        pinCount,
        pinType,
        address,
        timeSlot,
        // image: imageUri,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, paddingTop: 10 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Icon name="arrow-back" size={20} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yêu cầu thu gom</Text>
          <TouchableOpacity onPress={() => router.push('/guide')}>
            <Icon name="info" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>PINSWAP</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ tên của bạn</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Nhập họ tên"
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Thông tin liên hệ</Text>
            <TextInput
              style={styles.input}
              value={contactInfo}
              onChangeText={setContactInfo}
              placeholder="Nhập email"
              maxLength={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bạn có bao nhiêu pin cũ?</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pinCount}
              onChangeText={setPinCount}
              placeholder="Nhập số lượng pin"
              maxLength={4}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Những loại pin bạn có?</Text>
            <TextInput
              style={styles.input}
              value={pinType}
              onChangeText={setPinType}
              placeholder="Nhập loại pin"
              maxLength={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Địa chỉ bạn?</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Nhập địa chỉ"
            />
            <TouchableOpacity onPress={() => router.push('/map')}>
              <Icon name="location-on" size={20} color="#4CAF50" style={styles.locationIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Khung giờ bạn muốn chúng tôi đến thu gom?</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={timeSlot} onValueChange={setTimeSlot} style={styles.picker}>
                <Picker.Item label="Chọn khung giờ" value="" />
                {timeSlots.map((slot) => (
                  <Picker.Item key={slot} label={slot} value={slot} />
                ))}
              </Picker>
            </View>
            <Text style={styles.note}>Vui lòng chọn giờ gần nhất</Text>
          </View>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Vui lòng đính kèm hình ảnh pin cũ bạn</Text>
            <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
              <Icon name="photo" size={18} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Chọn ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={handleCamera}>
              <Icon name="camera-alt" size={18} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 80, height: 80, marginTop: 8, borderRadius: 4 }}
              />
            )}
          </View> */}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/profile')}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Icon name="send" size={18} color="#FFF" />
            <Text style={styles.submitText}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>

        {/* {!imageUri && (
          <View style={styles.confirmNote}>
            <Text style={styles.confirmText}>Vui lòng chụp ảnh để xác nhận</Text>
            <Icon name="sentiment-satisfied" size={20} color="#000" />
          </View>
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4CAF50',
  },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  logoContainer: { alignItems: 'center', padding: 10, backgroundColor: '#2E7D32' },
  logoText: { color: '#FFCA28', fontSize: 20, fontWeight: 'bold' },
  form: { paddingHorizontal: 10, paddingTop: 10 },
  inputContainer: {
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
    padding: 6,
    borderRadius: 4,
  },
  label: { fontSize: 14, marginBottom: 3 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    padding: 3,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
  },
  picker: { height: 36 },
  note: { fontSize: 10, color: '#757575', marginTop: 3 },
  locationIcon: { position: 'absolute', right: 8, top: 25 },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 6,
  },
  imageButtonText: { marginLeft: 6, color: '#4CAF50', fontSize: 12 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#E8F5E9',
  },
  cancelButton: { padding: 8, backgroundColor: '#E0E0E0', borderRadius: 6 },
  cancelText: { color: '#000', fontSize: 12 },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  submitText: { color: '#FFF', marginLeft: 6, fontSize: 12 },
  confirmNote: { alignItems: 'center', padding: 10 },
  confirmText: { fontSize: 12, marginBottom: 3, color: '#757575' },
});

export default YCTG;
