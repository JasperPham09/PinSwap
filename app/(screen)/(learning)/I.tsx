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
        {/* I */}
        <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>I. CẶP OXI HÓA – KHỬ</Text>
          </View>
          <Text style={styles.text}>
          - Cặp oxi hóa khử là tập hợp gồm hai chất, chất oxi hóa và chất khử tương ứng (chất oxi hóa và chất khử liên hợp), trong đó chất oxi hóa được đặt phía trước, chất khử tương ứng đặt phía sau và cách nhau bằng một gạch dọc (Ox/Kh).{"\n"}
          {"      "} VD: Fe2+/Fe, Ag+/Ag, Al3+/Al, 2H+/H2, Cl2/2Cl-, Fe3+/Fe2+, Cu2+/Cu, Cl2/2Cl-.{"\n"}
          </Text>
          <Text style={styles.text}>
          - Trong một cặp oxi hóa khử thì độ mạnh của chất oxi hóa và của chất khử ngược nhau. Nghĩa là nếu chất oxi hóa rất mạnh thì chất khử tương ứng sẽ rất yếu và ngược lại, nếu chất khử rất mạnh thì chất oxi hóa tương ứng sẽ rất yếu.{"\n"}
          {"       "}VD:{"\n"}
          {"       "}  + Với cặp K+/K thì do K có tính khử rất mạnh nên K+ có tính oxi hóa rất yếu.{"\n"}
          {"       "}  + Với cặp Au3+/Au thì do Au có tính khử rất yếu nên Au3+ có tính oxi hóa rất mạnh.{"\n"}
          </Text>
          <View style={styles.iconBottomRight}>
            <Entypo name="medal" size={24} color="#4a6f43" />
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