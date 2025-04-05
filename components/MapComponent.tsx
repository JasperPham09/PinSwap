import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// Các điểm thu gom mẫu (trong thực tế, bạn sẽ lấy từ API)
const SAMPLE_COLLECTION_POINTS = [
  { id: 1, name: 'Điểm Thu Gom 1', latitude: 10.773, longitude: 106.693 },
  { id: 2, name: 'Điểm Thu Gom 2', latitude: 10.780, longitude: 106.699 },
  { id: 3, name: 'Điểm Thu Gom 3', latitude: 10.765, longitude: 106.689 },
  { id: 4, name: 'Điểm Thu Gom 4', latitude: 10.771, longitude: 106.705 },
];

// Các màu cho tuyến đường
const ROUTE_COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8'];

export default function App() {
  const [region, setRegion] = useState({
    latitude: 10.773,
    longitude: 106.693,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [collectionPoints, setCollectionPoints] = useState<Point[]>([]);
  const [routes, setRoutes] = useState<Coordinate[][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // Yêu cầu quyền truy cập vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền truy cập vị trí bị từ chối', 'Vui lòng cấp quyền truy cập vị trí để sử dụng ứng dụng này.');
        return;
      }

      try {
        // Lấy vị trí hiện tại
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        setUserLocation({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại của bạn.');
      }
    })();
  }, []);

  interface GeocodeResult {
    latitude: number;
    longitude: number;
  }

  const geocodeAddress = async (address: string): Promise<GeocodeResult> => {
    try {
      // Trong thực tế, bạn sẽ sử dụng Google Geocoding API
      // Ví dụ: const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
      
      // Giả lập kết quả geocoding
      return {
        latitude: 10.775,
        longitude: 106.695,
      };
    } catch (error) {
      throw new Error('Không thể tìm thấy địa chỉ');
    }
  };

  interface Location {
    latitude: number;
    longitude: number;
  }

  interface Point {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance?: number;
  }

  const findNearestPoints = (
    location: Location, 
    points: Point[], 
    limit: number = 3
  ): Point[] => {
    // Tính khoảng cách giữa hai điểm
    const calculateDistance = (
      lat1: number, 
      lon1: number, 
      lat2: number, 
      lon2: number
    ): number => {
      const R = 6371; // Bán kính trái đất tính bằng km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    // Sắp xếp các điểm theo khoảng cách
    return points
      .map(point => ({
        ...point,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          point.latitude,
          point.longitude
        )
      }))
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
      .slice(0, limit);
  };

  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  const getRoute: (start: Coordinate, end: Coordinate) => Promise<Coordinate[]> = async (start, end) => {
    try {
      // Trong thực tế, bạn sẽ sử dụng Google Directions API
      // Ví dụ: const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=YOUR_API_KEY`);
      
      // Giả lập tuyến đường
      return [
        { latitude: start.latitude, longitude: start.longitude },
        { 
          latitude: (start.latitude + end.latitude) / 2, 
          longitude: (start.longitude + end.longitude) / 2 
        },
        { latitude: end.latitude, longitude: end.longitude },
      ];
    } catch (error) {
      throw new Error('Không thể tìm tuyến đường');
    }
  };

  const handleFindCollectionPoints = async () => {
    if (!address.trim() && !userLocation) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ hoặc cho phép truy cập vị trí của bạn.');
      return;
    }

    setLoading(true);

    try {
      // Lấy vị trí từ địa chỉ nếu có
      let searchLocation = userLocation;
      if (address.trim()) {
        searchLocation = await geocodeAddress(address);
      }

      // Tìm các điểm thu gom gần nhất
      if (!searchLocation) {
        throw new Error('Vị trí tìm kiếm không hợp lệ.');
      }
      const nearestPoints = findNearestPoints(searchLocation, SAMPLE_COLLECTION_POINTS);
      setCollectionPoints(nearestPoints);

      // Lấy tuyến đường cho mỗi điểm
      const routePromises = nearestPoints.map(point => 
        userLocation ? getRoute(userLocation, { latitude: point.latitude, longitude: point.longitude }) : Promise.resolve([])
      );
      
      const routeResults = await Promise.all(routePromises);
      setRoutes(routeResults);

      // Điều chỉnh vùng hiển thị trên bản đồ
      if (nearestPoints.length > 0) {
        const firstPoint = nearestPoints[0];
        setRegion({
          latitude: firstPoint.latitude,
          longitude: firstPoint.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tìm điểm thu gom.';
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation={true}
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Vị trí của bạn"
              pinColor="blue"
            />
          )}
          
          {collectionPoints.map((point, index) => (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              title={point.name}
              description={`Khoảng cách: ${point.distance?.toFixed(2)} km`}
              pinColor="red"
            />
          ))}
          
          {routes.map((route, index) => (
            <Polyline
              key={index}
              coordinates={route}
              strokeColor={ROUTE_COLORS[index % ROUTE_COLORS.length]}
              strokeWidth={3}
            />
          ))}
        </MapView>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleFindCollectionPoints}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="search" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Tìm điểm thu gom</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      {collectionPoints.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Các điểm thu gom gần nhất:</Text>
          {collectionPoints.map((point, index) => (
            <View key={point.id} style={styles.resultItem}>
              <View style={[styles.routeColor, { backgroundColor: ROUTE_COLORS[index % ROUTE_COLORS.length] }]} />
              <Text style={styles.resultText}>
                {point.name} - {point.distance?.toFixed(2)} km
              </Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  resultText: {
    fontSize: 14,
  },
});