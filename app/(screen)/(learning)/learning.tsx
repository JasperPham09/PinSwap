import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LearningScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BÀI HỌC</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/lythuyet")}>
                <Text style={styles.text1}>LÝ THUYẾT</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={40} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/baitap")}>
                <Text style={styles.text1}>BÀI TẬP</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="clipboard" size={35} color="#4a6f43" />
            </View>
        </View> 
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#edf2cc',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4a6f43',
      padding: 16,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      marginRight: 24,
    },
    content: {
      padding: 16,
      gap: 20,
    },
    card: {
      backgroundColor: '#d4f1e3',
      borderRadius: 12,
      padding: 16,
      position: 'relative',
    },
    text1: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: 'bold',
    },
    iconBottomRight: {
      position: 'absolute',
      bottom: 8,
      right: 20,
    },
  });