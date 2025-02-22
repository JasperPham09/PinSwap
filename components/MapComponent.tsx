// MapComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the Location interface here or in a separate types.d.ts file
export interface Location { // Export the interface to be used in index.tsx
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  typesOfBatteries: string[];
  openingHours: string;
  rating: number;
  imageUrl: string;
}

interface MapComponentProps {
  pinLocations: Location[]; // Explicitly type pinLocations prop
}

const MapComponent: React.FC<MapComponentProps> = ({ pinLocations }) => {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.77,
          longitude: 106.69,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pinLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.lat, longitude: location.lng }}
            title={location.name}
            description={location.address}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;