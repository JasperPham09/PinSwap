import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const ExplorePage = () => {
  const theme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
      <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Explore Pin Swap</Text>
      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        Welcome to Pin Swap!
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        Pin Swap is designed to make battery swapping easy and convenient. Here’s how it works:
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        Finding Locations
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        Use the map on the main screen to find nearby pin swap locations. Each location is marked with a pin,
        and you can tap on it to see more details such as the address, opening hours, and available battery types.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        Swapping Batteries
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        Visit a pin swap location and ask the staff to assist you with swapping your batteries. Make sure to bring
        your old batteries for recycling!
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        Battery Types
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        We support a wide range of battery types, including AA, AAA, C, D, and 9V. Check the location details to
        see which battery types are available at each location.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        Recycling
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        We are committed to environmental sustainability. All collected batteries are recycled responsibly.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        Contact Us
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        If you have any questions or feedback, please contact us at support@pinswap.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default ExplorePage;