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
        <TouchableOpacity onPress={() => router.push("/(screen)/lythuyet")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PIN ĐIỆN VÀ MÔI TRƯỜNG</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/I")}>
                <Text style={styles.text1}>Phần 1: Tổng quan về pin điện</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={30} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/II")}>
                <Text style={styles.text1}>Phần 2: Tác động của pin điện đến môi trường</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={30} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/III")}>
                <Text style={styles.text1}>Phần 3: Xử lý và tái chế pin điện</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={30} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/III")}>
                <Text style={styles.text1}>Phần 4: Giải pháp giảm thiểu tác động của pin điện</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={30} color="#4a6f43" />
            </View>
        </View> 
        <View style={styles.card}>
            <TouchableOpacity onPress={() => router.push("/(screen)/III")}>
                <Text style={styles.text1}>Phần 5: Ứng dụng thực tế và các dự án đổi mới sáng tạo</Text>
            </TouchableOpacity>
            <View style={styles.iconBottomRight}>
                <Entypo name="book" size={30} color="#4a6f43" />
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
      bottom: 12,
      right: 10,
    },
  });