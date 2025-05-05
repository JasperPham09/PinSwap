// leaderboard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';

const top3 = [
  { rank: 2, name: 'Emma Bùi', title: 'Thủ lĩnh môi trường', score: 96, color: '#007bff' },
  { rank: 1, name: 'Charles Tran', title: 'Tường quân xanh', score: 102, color: '#ffcc00' },
  { rank: 3, name: 'Nguyễn Khang', title: 'Đội trưởng tái chế', score: 49, color: '#dc3545' }
];

const others = [
  { rank: 4, name: 'Thu Hiền Đông', title: 'Đội trưởng tái chế', score: 48 },
  { rank: 5, name: 'thuthanh2112', title: 'Đội trưởng tái chế', score: 47 },
  // ... thêm dữ liệu tùy ý
];

export default function RankingScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>BẢNG XẾP HẠNG</Text>

      {/* Top 3 */}
      <View style={styles.top3Container}>
        {top3.map((user) => (
          <View key={user.rank} style={[styles.topCard, { backgroundColor: user.color }]}>
            <Text style={styles.rank}>Hạng {user.rank}</Text>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.subtitle}>{user.title}</Text>
            <Text style={styles.score}>{user.score} điểm</Text>
          </View>
        ))}
      </View>

      {/* Danh sách còn lại */}
      <FlatList
        data={others}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.rank}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.title}</Text>
            <Text style={styles.cell}>{item.score}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0e0', padding: 12 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  top3Container: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  topCard: { width: 110, padding: 10, borderRadius: 10, alignItems: 'center' },
  rank: { fontWeight: 'bold', color: '#fff' },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', marginVertical: 6 },
  name: { color: '#fff', fontWeight: 'bold' },
  subtitle: { color: '#fff', fontSize: 12 },
  score: { color: '#fff', fontWeight: 'bold', marginTop: 4 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10 },
  cell: { flex: 1, textAlign: 'center' },
});