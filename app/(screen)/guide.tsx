import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GuideScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HƯỚNG DẪN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Danh hiệu */}
        <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>DANH HIỆU</Text>
          </View>
          <Text style={styles.text}>
            “Tân binh xanh”: người dùng đạt số điểm từ 0-5.{"\n"}
            “Bình nhí thu gom”: người dùng đạt số điểm từ 6-19.{"\n"}
            “Đội trưởng tái chế”: người dùng đạt số điểm từ 20-49.{"\n"}
            “Thủ lĩnh môi trường”: người dùng đạt số điểm từ 50-99 điểm.{"\n"}
            “Tướng quân xanh”: người dùng đạt số điểm từ 100 trở lên
          </Text>
          <View style={styles.iconBottomRight}>
            <Entypo name="medal" size={24} color="#4a6f43" />
          </View>
        </View>

        {/* Điểm */}
        <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>ĐIỂM</Text>
          </View>
          <Text style={styles.text}>
            • Pin AA/AAA: 1 điểm/cục.{"\n"}
            • Pin đồng hồ hoặc các loại nhỏ khác: 2 điểm/cục.{"\n"}
            • Pin điện thoại/laptop…: 5 điểm/cục.{"\n"}
            • Pin năng lượng lớn (pin xe điện, pin UPS…): 10 điểm/cục.
          </Text>
          <View style={styles.iconBottomRight}>
            <FontAwesome5 name="battery-full" size={20} color="#4a6f43" />
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
  