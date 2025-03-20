import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Image source={require('./assets/avatar.png')} style={styles.avatar} /> */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>@Username</Text>
          <Text style={styles.role}>Đội trưởng tái chế  🔹  Điểm: 38</Text>
          <Text style={styles.stats}>Đang theo dõi: 16  |  Người theo dõi: 12  |  Xếp hạng: 10</Text>
        </View>
        <FontAwesome name="cog" size={24} color="white" style={styles.settingsIcon} />
      </View>

      {/* Menu Icons */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            {/* <FontAwesome name={item.icon} size={24} color="black" /> */}
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bài đăng */}
      {posts.map((post, index) => (
        <View key={index} style={styles.post}>
          <View style={styles.postHeader}>
            {/* <Image source={require('./assets/avatar.png')} style={styles.postAvatar} /> */}
            <View>
              <Text style={styles.postUsername}>@Username</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <View style={styles.postActions}>
            <FontAwesome name="heart-o" size={20} color="black" />
            <FontAwesome name="comment-o" size={20} color="black" />
            <FontAwesome name="share" size={20} color="black" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// Dữ liệu giả
const menuItems = [
  { label: 'Hướng dẫn', icon: 'book' },
  { label: 'Yêu cầu thu gom', icon: 'truck' },
  { label: 'Đổi quà', icon: 'gift' },
  { label: 'Bài tập', icon: 'file-text' },
];

const posts = [
  { time: '2 giờ trước', image: 'https://example.com/image1.jpg' },
  { time: '3 ngày trước', image: 'https://example.com/image2.jpg' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5dc' },
  header: { backgroundColor: '#4a7c59', padding: 20, flexDirection: 'row', alignItems: 'center' },
//   avatar: { width: 60, height: 60, borderRadius: 30 },
  userInfo: { marginLeft: 10, flex: 1 },
  username: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  role: { fontSize: 14, color: '#fff' },
  stats: { fontSize: 12, color: '#ddd' },
  settingsIcon: { marginLeft: 'auto' },
  menu: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', padding: 10 },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, marginTop: 5 },
  post: { backgroundColor: '#fff', marginVertical: 10, padding: 10, borderRadius: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUsername: { fontSize: 14, fontWeight: 'bold' },
  postTime: { fontSize: 12, color: 'gray' },
  postImage: { width: '100%', height: 200, borderRadius: 10 },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});
