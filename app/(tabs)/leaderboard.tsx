// app/(tabs)/leaderboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function RankingScreen() {
  const [top3, setTop3] = useState<Array<{ id: string; rank: number; name?: string; title?: string; points: number }>>([]);
  const [others, setOthers] = useState<Array<{ id: string; rank: number; name?: string; title?: string; points: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BẢNG XẾP HẠNG</Text>

      {/* Top 3 */}
      <View style={styles.top3Container}>
        {top3.map((user) => {
          let color = "#007bff"; // mặc định
          if (user.rank === 1) color = "#ffcc00";
          else if (user.rank === 2) color = "#007bff";
          else if (user.rank === 3) color = "#dc3545";

          return (
            <View key={user.id} style={[styles.topCard, { backgroundColor: color }]}>
              <Text style={styles.rank}>Hạng {user.rank}</Text>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.name}>{user.name || "Ẩn danh"}</Text>
              <Text style={styles.subtitle}>{user.title || "Người dùng"}</Text>
              <Text style={styles.score}>{user.points} điểm</Text>
            </View>
          );
        })}
      </View>

      {/* Những người còn lại */}
      <FlatList
        data={others}
        keyExtractor={(item) => item.id}
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
