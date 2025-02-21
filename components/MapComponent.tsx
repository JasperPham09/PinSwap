// MapComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    <View style={[styles.mapContainer, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
      {pinLocations.map((location: Location) => ( // Explicitly type location in map function
        <View key={location.id} style={styles.pin}>
          <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>{location.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  pin: {
    padding: 10,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
  },
});

export default MapComponent;