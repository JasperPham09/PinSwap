// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapComponent from '@/components/MapComponent'; // Import MapComponent correctly
import Location from '@/components/MapComponent'; // Import Location as default export
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import Modal from '@/components/ui/Modal';
import CollectionRequest from '@/app/home/collection-request';

const HomePage = () => {
  const [pinLocations, setPinLocations] = useState<Location[]>([]); // Explicitly type pinLocations state
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      // Define the initial pin locations
      const initialPinLocations: Location[] = [
        {
          id: 1,
          lat: 10.77,
          lng: 106.69,
          name: 'Pin Swap Location A - District 1',
          address: '123 ABC Street, District 1, HCMC',
          typesOfBatteries: ['AA', 'AAA', 'C'],
          openingHours: '8:00 - 20:00 daily',
          rating: 4.8,
          imageUrl: 'url_to_image_1.jpg',
        },
        {
          id: 2,
          lat: 10.78,
          lng: 106.70,
          name: 'Pin Swap Location B - District 3',
          address: '456 XYZ Street, District 3, HCMC',
          typesOfBatteries: ['9V', 'D', 'C'],
          openingHours: '9:00 - 21:00',
          rating: 4.5,
          imageUrl: 'url_to_image_2.jpg',
        },
      ];

      // Set the pin locations
      setPinLocations(initialPinLocations);
    } catch (error) {
      console.error('Failed to load initial pin locations:', error);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme === 'light' ? Colors.light.text : Colors.dark.text },
        ]}
      >
        Nearby Pin Swap Locations
      </Text>
      <MapComponent pinLocations={pinLocations} />
      <Button title="Request Home Collection" onPress={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request Home Collection">
        <CollectionRequest />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomePage;
