// /app/tabs/map.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.806279,
          longitude: 106.646124,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
         {/* Một điểm thu gom pin */}
        <Marker
          coordinate={{ latitude: 10.806279, longitude: 106.646124 }}
          title="Điểm thu gom pin"
          description="1A Nguyễn Hiến Lê, Phường 13, Tân Bình, Hồ Chí Minh"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
