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
        <TouchableOpacity onPress={() => router.push("/(screen)/(learning)/lythuyetpindien")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LÝ THUYẾT PIN ĐIỆN</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>II. ĐIỆN CỰC</Text>
          </View>
          <Text style={styles.text}>
          - Hệ gồm một tấm kim loại nhúng trong dung dịch một muối của kim loại đó được gọi là điện cực.{"\n"}
            + Sơ đồ điện cực: M^n+|M{"\n"} 
            + Phản ứng điện cực: M^n+ + ne -{">"}  M{"\n"}
                VD: Thanh kẽm tiếp xúc dung dịch ZnSO4{"\n"}
                •	Sơ đồ điện cực: Zn^2+|Zn {"\n"}
                •	Phản ứng điện cực: Zn^2+ + 2e -{">"} Zn{"\n"}
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