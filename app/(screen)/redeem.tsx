import React, { useEffect, useState, } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { router, useRouter } from 'expo-router';

type Reward = {
  id: string;
  name: string;
  description: string;
  cost: number;
};

export default function RedeemScreen() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const rewardSnap = await getDocs(collection(db, 'rewards'));
      const rewardList: Reward[] = rewardSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reward[];

      if (user?.uid) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setUserPoints(userData?.points || 0);
      }

      setRewards(rewardList);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleRedeem = async (reward: Reward) => {
    if (!user?.uid) return;
    if (userPoints < reward.cost) {
      Alert.alert("Không đủ điểm", "Bạn cần thêm điểm để đổi phần thưởng này.");
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        points: userPoints - reward.cost,
      });
      setUserPoints((prev) => prev - reward.cost);
      Alert.alert("Đổi thành công", `Bạn đã đổi "${reward.name}" thành công!`);
    } catch (error) {
      console.error("Lỗi đổi quà:", error);
      Alert.alert("Lỗi", "Không thể đổi phần thưởng lúc này.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Quà</Text>
      <Text style={styles.points}>Điểm hiện tại: {userPoints}</Text>

      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rewardCard}>
            <Text style={styles.rewardName}>{item.name}</Text>
            <Text style={styles.rewardDesc}>{item.description}</Text>
            <Text style={styles.rewardCost}>Cần {item.cost} điểm</Text>
            <Button
              title="Đổi quà"
              onPress={() => handleRedeem(item)}
              disabled={userPoints < item.cost}
              color={userPoints < item.cost ? 'gray' : '#28a745'}
            />
          </View>
        )}
      />

      {/* Back to Profile button using Link from expo-router */}
        <TouchableOpacity 
        onPress={() => router.push("/(tabs)/profile")} 
        style={{ backgroundColor: '#4C7744', padding: 5, borderRadius: 8, width: 150, marginLeft: 80}}>
        <Text style={{ color: '#fff', textAlign: 'center', }}>Quay lại</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0e0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  points: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  rewardCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  rewardName: { fontSize: 18, fontWeight: 'bold' },
  rewardDesc: { fontSize: 14, color: '#555', marginVertical: 4 },
  rewardCost: { fontSize: 14, marginBottom: 8 },
});
