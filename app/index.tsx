// // app/(tabs)/index.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import MapComponent from '@/components/MapComponent'; // Import MapComponent correctly
// import Location from '@/components/MapComponent'; // Import Location as default export
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useRouter } from 'expo-router';
// import Modal from '@/components/ui/Modal';
// import CollectionRequest from '@/app/home/collection-request';

// const HomePage = () => {
//   const [pinLocations, setPinLocations] = useState<Location[]>([]); // Explicitly type pinLocations state
//   const theme = useColorScheme() ?? 'light';
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     try {
//       // Define the initial pin locations
//       const initialPinLocations: Location[] = [
//         {
//           id: 1,
//           lat: 10.77,
//           lng: 106.69,
//           name: 'Pin Swap Location A - District 1',
//           address: '123 ABC Street, District 1, HCMC',
//           typesOfBatteries: ['AA', 'AAA', 'C'],
//           openingHours: '8:00 - 20:00 daily',
//           rating: 4.8,
//           imageUrl: 'url_to_image_1.jpg',
//         },
//         {
//           id: 2,
//           lat: 10.78,
//           lng: 106.70,
//           name: 'Pin Swap Location B - District 3',
//           address: '456 XYZ Street, District 3, HCMC',
//           typesOfBatteries: ['9V', 'D', 'C'],
//           openingHours: '9:00 - 21:00',
//           rating: 4.5,
//           imageUrl: 'url_to_image_2.jpg',
//         },
//       ];

//       // Set the pin locations
//       setPinLocations(initialPinLocations);
//     } catch (error) {
//       console.error('Failed to load initial pin locations:', error);
//     }
//   }, []);

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background },
//       ]}
//     >
//       <Text
//         style={[
//           styles.title,
//           { color: theme === 'light' ? Colors.light.text : Colors.dark.text },
//         ]}
//       >
//         Nearby Pin Swap Locations
//       </Text>
//       <MapComponent pinLocations={pinLocations} />
//       <Button title="Request Home Collection" onPress={() => setIsModalOpen(true)} />

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request Home Collection">
//         <CollectionRequest />
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default HomePage;

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
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Khởi tạo Geocoder với API key
    // Trong ứng dụng thực tế, không hardcode API key; sử dụng biến môi trường hoặc lưu trữ an toàn
    Geocoder.init("AIzaSyDiLpHGaPBs4ahHKvceqw4yXFyeN4SlSJw");

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
      const response = await Geocoder.from(address);
      if (response.results.length > 0) {
        const location = response.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        throw new Error('Không tìm thấy kết quả cho địa chỉ này');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Geocoding thất bại: ' + error.message);
      } else {
        throw new Error('Geocoding thất bại: Unknown error');
      }
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

  const handleFindCollectionPoints = async () => {
    if (!address.trim() && !userLocation) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ hoặc cho phép truy cập vị trí của bạn.');
      return;
    }

    setLoading(true);

    try {
      let searchLocation = userLocation;
      if (address.trim()) {
        searchLocation = await geocodeAddress(address);
      }

      if (!searchLocation) {
        throw new Error('Vị trí tìm kiếm không hợp lệ.');
      }
      const nearestPoints = findNearestPoints(searchLocation, SAMPLE_COLLECTION_POINTS);
      setCollectionPoints(nearestPoints);

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
          
          {userLocation && collectionPoints.length > 0 && collectionPoints.map((point, index) => (
            <MapViewDirections
              key={index}
              origin={userLocation}
              destination={{ latitude: point.latitude, longitude: point.longitude }}
              apikey="YOUR_GOOGLE_MAPS_API_KEY"
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