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
VD: Fe2+/Fe, Ag+/Ag, Al3+/Al, 2H+/H2, Cl2/2Cl-, Fe3+/Fe2+, Cu2+/Cu, Cl2/2Cl-.{"\n"}
- Trong một cặp oxi hóa khử thì độ mạnh của chất oxi hóa và của chất khử ngược nhau. Nghĩa là nếu chất oxi hóa rất mạnh thì chất khử tương ứng sẽ rất yếu và ngược lại, nếu chất khử rất mạnh thì chất oxi hóa tương ứng sẽ rất yếu.{"\n"}
VD:{"\n"}
+ Với cặp K+/K thì do K có tính khử rất mạnh nên K+ có tính oxi hóa rất yếu.{"\n"}
+ Với cặp Au3+/Au thì do Au có tính khử rất yếu nên Au3+ có tính oxi hóa rất mạnh.


          </Text>
          <View style={styles.iconBottomRight}>
            <Entypo name="medal" size={24} color="#4a6f43" />
          </View>
        </View>

        {/* II */}
        <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>II. ĐIỆN CỰC</Text>
          </View>
          <Text style={styles.text}>
          - Hệ gồm một tấm kim loại nhúng trong dung dịch một muối của kim loại đó được gọi là điện cực.{"\n"}
        + Sơ đồ điện cực: M^n+|M{"\n"} 
        + Phản ứng điện cực: M^n+ + ne ->  M{"\n"}
        VD: Thanh kẽm tiếp xúc dung dịch ZnSO4{"\n"}
        •	Sơ đồ điện cực: Zn^2+|Zn {"\n"}
        •	Phản ứng điện cực: Zn^2+ + 2e -> Zn{"\n"}
          </Text>
          <View style={styles.iconBottomRight}>
            <FontAwesome5 name="battery-full" size={20} color="#4a6f43" />
          </View>
        </View>
         {/* III */}
         <View style={styles.card}>
          <View style={styles.label}>
            <Text style={styles.labelText}>III. THẾ ĐIỆN CỰC</Text>
          </View>
<Text style={styles.text}>
          - Hiệu thế cân bằng sinh ra giữa mặt kim loại và lớp dung dịch bao quanh kim loại được gọi là thế điện cực.{"\n"}
- Điện cực chuẩn so sánh được quốc tế chấp nhận là điện cực hydrogen tiêu chuẩn có thế điện cực   (áp suất khí H2 bằng 1 atm và nồng độ H+ = 1M).{"\n"}
          </Text>
          <Image source={require('../../assets/images/lythuyetpindien.jpg')} style={{ width: '100%', height: 200, borderRadius: 12 }} />
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