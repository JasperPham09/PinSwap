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
        <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/lythuyet")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LÝ THUYẾT PIN ĐIỆN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/I")}>
                <Text style={styles.text1}>I. CẶP OXI HÓA – KHỬ</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={40} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/II")}>
                <Text style={styles.text1}>II. ĐIỆN CỰC</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={40} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/III")}>
                <Text style={styles.text1}>III. THẾ ĐIỆN CỰC</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={40} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/IV")}>
                <Text style={styles.text1}>IV. DÃY ĐIỆN HÓA</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={40} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/V")}>
                <Text style={styles.text1}>V. NGUYÊN TỐ ĐIỆN HÓA</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={40} color="#4a6f43" />
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