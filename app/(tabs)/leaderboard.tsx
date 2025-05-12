// app/(tabs)/leaderboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function RankingScreen() {
  const [top3, setTop3] = useState<Array<{ id: string; rank: number; name?: string; title?: string; points: number }>>([]);
  const [others, setOthers] = useState<Array<{ id: string; rank: number; name?: string; title?: string; points: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      const q = query(collection(db, 'users'), orderBy('points', 'desc'));
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map((doc, index) => {
        const data = doc.data() as {
          name?: string;
          title?: string;
          points: number;
        };

        return {
          id: doc.id,
          rank: index + 1,
          name: data.name,
          title: data.title,
          points: data.points,
        };
      });

      setTop3(users.slice(0, 3));
      setOthers(users.slice(3));
    } catch (err) {
      console.error('Lỗi khi tải bảng xếp hạng:', err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLeaderboard();
      setLoading(false);
    })();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BẢNG XẾP HẠNG</Text>

      {/* Top 3 */}
      <View style={styles.top3Container}>
        {top3[1] && (
          <View key={top3[1].id} style={[styles.topCard, { backgroundColor: '#007bff' }]}>
            <Text style={styles.rank}>Hạng 2</Text>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.name}>{top3[1].name || "Ẩn danh"}</Text>
            <Text style={styles.subtitle}>{top3[1].title || "Người dùng"}</Text>
            <Text style={styles.score}>{top3[1].points} điểm</Text>
          </View>
        )}
        {top3[0] && (
          <View key={top3[0].id} style={[styles.topCard, styles.topCardFirst, { backgroundColor: '#ffcc00' }]}>
            <Text style={styles.rank}>Hạng 1</Text>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.name}>{top3[0].name || "Ẩn danh"}</Text>
            <Text style={styles.subtitle}>{top3[0].title || "Người dùng"}</Text>
            <Text style={styles.score}>{top3[0].points} điểm</Text>
          </View>
        )}
        {top3[2] && (
          <View key={top3[2].id} style={[styles.topCard, { backgroundColor: '#dc3545' }]}>
            <Text style={styles.rank}>Hạng 3</Text>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.name}>{top3[2].name || "Ẩn danh"}</Text>
            <Text style={styles.subtitle}>{top3[2].title || "Người dùng"}</Text>
            <Text style={styles.score}>{top3[2].points} điểm</Text>
          </View>
        )}
      </View>

      {/* Những người còn lại */}
      <FlatList
        data={others}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.rank}</Text>
            <Text style={styles.cell}>{item.name || "Ẩn danh"}</Text>
            <Text style={styles.cell}>{item.title || "Người dùng"}</Text>
            <Text style={styles.cell}>{item.points}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0e0', padding: 12 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  top3Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
  },
  topCard: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  rank: { fontWeight: 'bold', color: '#fff' },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', marginVertical: 6 },
  name: { color: '#fff', fontWeight: 'bold' },
  subtitle: { color: '#fff', fontSize: 12 },
  score: { color: '#fff', fontWeight: 'bold', marginTop: 4 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10 },
  cell: { flex: 1, textAlign: 'center' },
  topCardFirst: {
    transform: [{ translateY: -20 }],
  },
});
