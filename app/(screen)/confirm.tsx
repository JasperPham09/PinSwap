import { useLocalSearchParams, router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ConfirmScreen() {
  const {
    fullName,
    pinCount,
    address,
    timeSlot,
    contactInfo,
    pinType,
    // image, // Nếu cần dùng ảnh
  } = useLocalSearchParams();

  const handleConfirm = async () => {
    try {
      await addDoc(collection(db, 'requests'), {
        fullName,
        contactInfo,
        pinCount,
        pinType,
        address,
        timeSlot,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Thành công', 'Yêu cầu của bạn đã được gửi.');
      router.push('/home');
    } catch (error) {
      console.error('Lỗi khi lưu yêu cầu:', error);
      Alert.alert('Lỗi', 'Không thể lưu yêu cầu. Vui lòng thử lại!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Xác nhận Yêu cầu</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>
          Họ tên: <Text style={styles.value}>{fullName}</Text>
        </Text>
        <Text style={styles.label}>
          Thông tin liên hệ: <Text style={styles.value}>{contactInfo}</Text>
        </Text>
        <Text style={styles.label}>
          Số lượng pin: <Text style={styles.value}>{pinCount}</Text>
        </Text>
        <Text style={styles.label}>
          Loại pin: <Text style={styles.value}>{pinType}</Text>
        </Text>
        <Text style={styles.label}>
          Địa chỉ: <Text style={styles.value}>{address}</Text>
        </Text>
        <Text style={styles.label}>
          Khung giờ: <Text style={styles.value}>{timeSlot}</Text>
        </Text>
        {/* Nếu bạn dùng ảnh:
        <Text style={styles.label}>Ảnh chụp:</Text>
        {image && (
          <Image
            source={{ uri: image as string }}
            style={styles.image}
            resizeMode="cover"
          />
        )} */}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Icon name="check-circle" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2E7D32',
  },
  infoBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  value: {
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
