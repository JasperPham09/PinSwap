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
        <TouchableOpacity onPress={() => router.push("/(screen)/lythuyetpindien")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LÝ THUYẾT PIN ĐIỆN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         {/* III */}
         <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>IV. DÃY ĐIỆN HÓA</Text>
          </View>
            <Text style={styles.text}>
            1. Dãy điện hóa của kim loại {"\n"}
                {"    "}- Nguyên tắc sắp xếp từ trái sang phải: {"\n"}
                {"        "}+ Tính khử kim loại giảm{"\n"}
                {"        "}+ Tính oxi hóa ion kim loại tăng{"\n"}
            <Image source={require('../../assets/images/oxhiontang.png')} style={{ width: 300, height: 20, marginTop: 10 }} />
            </Text>
          <View style={styles.iconBottomRight}>
            {/* <Entypo name="medal" size={24} color="#4a6f43" /> */}
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
      marginTop: 24,
    },
    card: {
      backgroundColor: '#d4f1e3',
      borderRadius: 12,
      padding: 16,
      position: 'relative',
    },
    label: {
      position: 'absolute',
      top: -16,
      alignSelf: 'center',
      backgroundColor: '#f7d94c',
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 20,
      zIndex: 1,
    },
    labelText: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    text: {
      marginTop: 16,
      fontSize: 14,
      lineHeight: 22,
    },
    iconBottomRight: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });