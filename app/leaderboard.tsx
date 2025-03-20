import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';

export default function RankingScreen() {
  const top3 = [
    // { rank: 2, name: 'Emma Bùi', title: 'Thủ lĩnh xanh', score: 60, color: '#007bff', image: require('./assets/avatar2.png') },
    // { rank: 1, name: 'Charles Tran', title: 'Tường quân xanh', score: 102, color: '#ffcc00', image: require('./assets/avatar1.png') },
    { rank: 3, name: 'Nguyễn Khang', title: 'Chiến binh sơ cấp', score: 40, color: '#dc3545'}
  ];

  const rankingList = [
    { rank: 4, name: 'Ngọc Linh', title: 'Bộ trưởng tái chế', score: 47 },
    { rank: 5, name: 'Huỳnh An', title: 'Bộ trưởng tái chế', score: 47 },
    { rank: 6, name: 'IceSpear', title: 'Bộ trưởng tái chế', score: 42 },
    { rank: 7, name: 'NOKJAY', title: 'Bộ trưởng tái chế', score: 40 },
    { rank: 8, name: 'Lưu Khoa', title: 'Bộ trưởng tái chế', score: 38 },
    { rank: 9, name: 'Hoàng Minh', title: 'Đội trưởng tái chế', score: 36 },
    { rank: 10, name: 'Hạnh Phúc', title: 'Đội trưởng tái chế', score: 30 }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>BẢNG XẾP HẠNG</Text>

      {/* Top 3 */}
      <View style={styles.top3Container}>
        {top3.map((user, index) => (
          <View key={index} style={[styles.top3Card, { backgroundColor: user.color }]}>
            <Text style={styles.rankText}>Hạng {user.rank}</Text>
            {/* <Image source={user.image} style={styles.avatar} /> */}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.titleText}>{user.title}</Text>
            <Text style={styles.score}>{user.score} điểm</Text>
          </View>
        ))}
      </View>

      {/* Danh sách xếp hạng */}
      <FlatList
        data={rankingList}
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
  container: { flex: 1, backgroundColor: '#f5f5dc', padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  top3Container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  top3Card: { width: 100, borderRadius: 10, alignItems: 'center', padding: 10 },
  rankText: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginVertical: 5 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  titleText: { fontSize: 12, color: '#fff' },
  score: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  row: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 8 },
  cell: { flex: 1, textAlign: 'center' },
});

