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
         {/* III */}
         <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>III. THẾ ĐIỆN CỰC</Text>
          </View>
<Text style={styles.text}>
          - Hiệu thế cân bằng sinh ra giữa mặt kim loại và lớp dung dịch bao quanh kim loại được gọi là thế điện cực.{"\n"}
- Điện cực chuẩn so sánh được quốc tế chấp nhận là điện cực hydrogen tiêu chuẩn có thế điện cực   (áp suất khí H2 bằng 1 atm và nồng độ H+ = 1M).{"\n"}
          </Text>
          <Image source={require('../../../assets/images/III-(1).jpg')} style={{ width: '100%', height: 200, borderRadius: 12 }} />
            <Text style={styles.text}>
            - Thế điện cực của một điện cực bằng hiệu điện thế của nó so với điện cực tiêu chuẩn. Muốn xác định thế tương đối của một điện cực nào đó, người ta ghép điện cực đó với điện cực hydrogen chuẩn thành một pin điện.
- Thế điện cực tiêu chuẩn của một cặp oxi hóa – khử liên hợp chính là sức điện động của một pin ráp bởi điện cực chuẩn của cặp oxi hóa – khử liên hợp đó với điện cực hydrogen tiêu chuẩn.
- Thế điện cực chuẩn của cặp oxi hóa – khử càng lớn thì tính khử của dạng khử càng yếu, tính oxi hóa của dạng oxi hóa càng mạnh.
VD1: Sức điện động của pin bạc - hydrogen
            </Text>
            <Image source={require('../../../assets/images/III-(2).jpg')} style={{ width: '100%', height: 200, borderRadius: 12 }} />
            <Text style={styles.text}>
            VD2: Sức điện động của pin đồng – hydrogen
                Pt(s)│H2 (g, 1 atm)│H+ (aq, 1 M)║Cu2+(aq, 1M)│Cu(s)
            </Text>
            <Image source={require('../../../assets/images/III-(3).jpg')} style={{ width: '100%', height: 200, borderRadius: 12 }} />

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