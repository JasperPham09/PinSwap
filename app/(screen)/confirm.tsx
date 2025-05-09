import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ConfirmScreen() {
  const { pinCount, address, timeSlot, swapOption, image } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Xác nhận Yêu cầu</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Số lượng pin: <Text style={styles.value}>{pinCount}</Text></Text>
        <Text style={styles.label}>Địa chỉ: <Text style={styles.value}>{address}</Text></Text>
        <Text style={styles.label}>Khung giờ: <Text style={styles.value}>{timeSlot}</Text></Text>
        <Text style={styles.label}>Đổi pin: <Text style={styles.value}>{swapOption}</Text></Text>
      </View>

      {image && (
        <Image source={{ uri: image as string }} style={styles.image} resizeMode="cover" />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Icon name="check-circle" size={20} color="#FFF" />
        <Text style={styles.buttonText}>Xác nhận và quay lại</Text>
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
