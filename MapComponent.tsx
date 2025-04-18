// types.ts hoặc cùng trong file
export interface Location {
    latitude: number;
    longitude: number;
    title?: string;
  }
  
  // MapComponent.tsx
  import React from 'react';
  import { View, Text } from 'react-native';
  import { Location } from '../type'; // hoặc chỉnh path cho đúng
  
  interface MapComponentProps {
    pinLocations: Location[];
  }
  
  const MapComponent: React.FC<MapComponentProps> = ({ pinLocations }) => {
    return (
      <View>
        {pinLocations.map((pin, index) => (
          <Text key={index}>{pin.title ?? `Pin ${index + 1}`}</Text>
        ))}
      </View>
    );
  };
  
  export default MapComponent;
  