import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const YCTG = () => {
  const [pinCount, setPinCount] = useState('');
  const [pinType, setPinType] = useState('');
  const [swapOption, setSwapOption] = useState('Không');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const timeSlots = ['8:00-11:00', '14:00-17:00'];

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Quyền bị từ chối', 'Vui lòng cho phép truy cập thư viện ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    if (!pinCount || !address || !timeSlot || !imageUri) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin và tải ảnh lên!');
      return;
    }

    router.push({
      pathname: '/(screen)/confirm',
      params: {
        pinCount,
        address,
        timeSlot,
        swapOption,
        image: imageUri,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yêu cầu thu gom</Text>
        <TouchableOpacity onPress={() => router.push('/guide')}>
          <Icon name="info" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>PINSWAP</Text>
      </View>

      <View style={styles.form}>
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
          <View style={styles.pickerContainer}>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={pinType}
                onChangeText={setPinType}
                placeholder="Nhập loại pin"
                maxLength={4}
            />
          </View>
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
            <Icon name="location-on" size={24} color="#4CAF50" style={styles.locationIcon} />
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Vui lòng đính kèm hình ảnh pin cũ bạn</Text>
          <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
            <Icon name="photo" size={20} color="#4CAF50" />
            <Text style={styles.imageButtonText}>Chọn ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={handleCamera}>
            <Icon name="camera-alt" size={20} color="#4CAF50" />
            <Text style={styles.imageButtonText}>Chụp ảnh</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: 4 }}
            />
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/home')}>
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="send" size={20} color="#FFF" />
          <Text style={styles.submitText}>Gửi yêu cầu</Text>
        </TouchableOpacity>
      </View>

      {!imageUri && (
        <View style={styles.confirmNote}>
          <Text style={styles.confirmText}>Vui lòng chụp ảnh để xác nhận</Text>
          <Icon name="sentiment-satisfied" size={24} color="#000" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 13, backgroundColor: '#4CAF50',
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  logoContainer: { alignItems: 'center', padding: 12, backgroundColor: '#2E7D32' },
  logoText: { color: '#FFCA28', fontSize: 24, fontWeight: 'bold' },
  form: { padding: 16 },
  inputContainer: {
    marginBottom: 16, backgroundColor: '#FFF',
    borderLeftWidth: 4, borderLeftColor: '#2E7D32',
    padding: 8, borderRadius: 4,
  },
  label: { fontSize: 16, marginBottom: 4 },
  input: { borderBottomWidth: 1, borderBottomColor: '#CCC', padding: 4, fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderColor: '#CCC', borderRadius: 4 },
  picker: { height: 40 },
  note: { fontSize: 12, color: '#757575', marginTop: 4 },
  locationIcon: { position: 'absolute', right: 10, top: 30 },
  imageButton: {
    flexDirection: 'row', alignItems: 'center', padding: 8,
    backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 8,
  },
  imageButtonText: { marginLeft: 8, color: '#4CAF50' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  cancelButton: { padding: 12, backgroundColor: '#E0E0E0', borderRadius: 8 },
  cancelText: { color: '#000' },
  submitButton: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    backgroundColor: '#4CAF50', borderRadius: 8,
  },
  submitText: { color: '#FFF', marginLeft: 8 },
  confirmNote: { alignItems: 'center', padding: 16 },
  confirmText: { fontSize: 14, marginBottom: 4 },
});

export default YCTG;
